/*
Template Name: Admin Template
Author: Wrappixel

File: js
*/
// ============================================================== 
// Auto select left navbar
// ============================================================== 
var nav= document.querySelector("aside");

nav.innerHTML=`<div class="scroll-sidebar">
<!-- Sidebar navigation-->
<nav class="sidebar-nav">
    <ul id="sidebarnav">
        <!-- User Profile-->
        <li class="sidebar-item pt-2">
            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="dashboard.html"
                aria-expanded="false">
                <i class="far fa-clock" aria-hidden="true"></i>
                <span class="hide-menu">Dashboard</span>
            </a>
        </li>
        <li class="sidebar-item">
            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="profile.html"
                aria-expanded="false">
                <i class="fa fa-user-circle" aria-hidden="true"></i>
                <span class="hide-menu">Profile</span>
            </a>
        </li>
        <li class="sidebar-item">
            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="PatientsA.html"
                aria-expanded="false">
                <i class="fa fa-user" aria-hidden="true"></i>
                <span class="hide-menu">Patients</span>
            </a>
        </li>
        <li class="sidebar-item">
            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="PathologistsA.html"
                aria-expanded="false">
                <i class="fa fa-user-md" aria-hidden="true"></i>
                <span class="hide-menu">Pathologists</span>
            </a>
        </li>
        <li class="sidebar-item">
            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="AddUser.html"
                aria-expanded="false">
                <i class="fa fa-user-plus" aria-hidden="true"></i>
                <span class="hide-menu">Add Users</span>
            </a>
        </li>
        <li class="sidebar-item">
            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="ReportsList.html"
                aria-expanded="false">
                <i class="fa fa-clipboard" aria-hidden="true"></i>
                <span class="hide-menu">Reports</span>
            </a>
        </li>
        <li class="sidebar-item">
            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="blank.html"
                aria-expanded="false">
                <i class="fa fa-comments" aria-hidden="true"></i>
                <span class="hide-menu">Messages</span>
            </a>
        </li>
        <li class="sidebar-item">
            <a class="sidebar-link waves-effect waves-dark sidebar-link" href="404.html"
                aria-expanded="false">
                <i class="fa fa-info-circle" aria-hidden="true"></i>
                <span class="hide-menu">Settings</span>
            </a>
        </li>
        <li class="text-center p-20 upgrade-btn">
            <a href="https://www.wrappixel.com/templates/ampleadmin/"
                class="btn btn-block btn-danger text-white" target="_blank">
                Logout</a>
        </li>
    </ul>

</nav>
<!-- End Sidebar navigation -->
</div>`;

$(function() {
    "use strict";
     var url = window.location + "";
        var path = url.replace(window.location.protocol + "//" + window.location.host + "/", "");
        var element = $('ul#sidebarnav a').filter(function() {
            return this.href === url || this.href === path;// || url.href.indexOf(this.href) === 0;
        });
        element.parentsUntil(".sidebar-nav").each(function (index)
        {
            if($(this).is("li") && $(this).children("a").length !== 0)
            {
                $(this).children("a").addClass("active");
                $(this).parent("ul#sidebarnav").length === 0
                    ? $(this).addClass("active")
                    : $(this).addClass("selected");
            }
            else if(!$(this).is("ul") && $(this).children("a").length === 0)
            {
                $(this).addClass("selected");
                
            }
            else if($(this).is("ul")){
                $(this).addClass('in');
            }
            
        });

    element.addClass("active"); 
    $('#sidebarnav a').on('click', function (e) {
        
            if (!$(this).hasClass("active")) {
                // hide any open menus and remove all other classes
                $("ul", $(this).parents("ul:first")).removeClass("in");
                $("a", $(this).parents("ul:first")).removeClass("active");
                
                // open our new menu and add the open class
                $(this).next("ul").addClass("in");
                $(this).addClass("active");
                
            }
            else if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(this).parents("ul:first").removeClass("active");
                $(this).next("ul").removeClass("in");
            }
    })
    $('#sidebarnav >li >a.has-arrow').on('click', function (e) {
        e.preventDefault();
    });
    
});