import sys, json
import os
from cv2 import cv2
import histomicstk as htk
import scipy as sp
import skimage.io
import skimage.measure
import skimage.color
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.image as mpimg
from scipy import misc
from scipy.ndimage import gaussian_filter
from PIL import Image  
import PIL 
import glob
from keras.preprocessing.image import ImageDataGenerator,array_to_img, img_to_array, load_img 
import keras
from keras import backend as K
import scipy

import numpy as np
import cython
os.environ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'

img = cv2.imread(sys.argv[1])
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
plt.imshow(img)
ref_image_file = (sys.argv[1])  # L1.png
im_reference = cv2.imread(ref_image_file)
im_reference = cv2.cvtColor(im_reference, cv2.COLOR_BGR2RGB)
mean_ref, std_ref = htk.preprocessing.color_conversion.lab_mean_std(im_reference)

# color normalization


img_norm=htk.preprocessing.color_normalization.reinhard(img, mean_ref, std_ref)
plt.imshow(img_norm)

# create stain to color map
stainColorMap = {
    'hematoxylin': [0.65, 0.70, 0.29],
    'eosin':       [0.07, 0.99, 0.11],
    'dab':         [0.27, 0.57, 0.78],
    'null':        [0.0, 0.0, 0.0]
}

stain_1 = 'hematoxylin'   
stain_2 = 'eosin'         
stain_3 = 'null'          

# create stain matrix
W = np.array([stainColorMap[stain_1],
              stainColorMap[stain_2],
              stainColorMap[stain_3]]).T


# color deconvolution
img_stain=htk.preprocessing.color_deconvolution.color_deconvolution(img, W).Stains
plt.imshow(img_stain)    

import PIL
im_nuclei_stain = img_stain [:, :, 0]
    # segment foreground
foreground_threshold = 120

im_fgnd_mask = sp.ndimage.morphology.binary_fill_holes(
    im_nuclei_stain < foreground_threshold)

min_radius = 10
max_radius = 15


im_log_max, im_sigma_max = htk.filters.shape.cdog(
    im_nuclei_stain, im_fgnd_mask,
    sigma_min=min_radius * np.sqrt(2),
    sigma_max=max_radius * np.sqrt(2)
)

#segment nuclei using local maximum clustering
local_max_search_radius = 10

im_nuclei_seg_mask, seeds, maxima = htk.segmentation.nuclear.max_clustering(
    im_log_max, im_fgnd_mask, local_max_search_radius)

min_nucleus_area = 50

im_nuclei_seg_mask = htk.segmentation.label.area_open(
    im_nuclei_seg_mask, min_nucleus_area).astype(np.int32)

# compute nuclei properties
objProps = skimage.measure.regionprops(im_nuclei_seg_mask)
img_seg=skimage.color.label2rgb(im_nuclei_seg_mask, img_norm, bg_label=0)
plt.imshow(img_seg)    



def recall_m(y_true, y_pred):
    true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
    possible_positives = K.sum(K.round(K.clip(y_true, 0, 1)))
    recall = true_positives / (possible_positives + K.epsilon())
    return recall

def precision_m(y_true, y_pred):
    true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
    predicted_positives = K.sum(K.round(K.clip(y_pred, 0, 1)))
    precision = true_positives / (predicted_positives + K.epsilon())
    return precision

def f1_m(y_true, y_pred):
    precision = precision_m(y_true, y_pred)
    recall = recall_m(y_true, y_pred)
    return 2*((precision*recall)/(precision+recall+K.epsilon()))

model = []
model1 = keras.models.load_model('D:\\MIU\\Graduation Project\\project\\BreastCancerDetectionUsingPathology\\Application\\server\\python\\my_model\\my_model',custom_objects={'f1_m':f1_m,'precision_m':precision_m,'recall_m':recall_m})

model.append(model1)

models = []
for i in range(len(model)):
    print(model[i])
    models.append(model[i])







from sklearn.metrics import classification_report, confusion_matrix
img2 = cv2.resize(img_seg,(224,224))

img2 = np.reshape(img2,[1,224,224,3])    
# Predict labels with models
labels = []
for m in models:
    pred = m.predict(img2)
    predicts=np.argmax(pred,axis=-1)
    labels.append(predicts)

    print(predicts)

labels = np.array(labels)
labels = np.transpose(labels, (1, 0))
labels = scipy.stats.mode(labels, axis=1)[0]
labels = np.squeeze(labels)



send_message_back = {
  'arguments': str(labels),

}


print(json.dumps(send_message_back))


# %%
