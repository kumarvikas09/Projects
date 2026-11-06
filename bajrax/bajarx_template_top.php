<?php
/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2014 osCommerce

  Released under the GNU General Public License
*/

  $oscTemplate->buildBlocks();

  if (!$oscTemplate->hasBlocks('boxes_column_left')) {
    $oscTemplate->setGridContentWidth($oscTemplate->getGridContentWidth() + $oscTemplate->getGridColumnWidth());
  }

  if (!$oscTemplate->hasBlocks('boxes_column_right')) {
    $oscTemplate->setGridContentWidth($oscTemplate->getGridContentWidth() + $oscTemplate->getGridColumnWidth());
  }
?>
<!DOCTYPE html>
<html <?php echo HTML_PARAMS; ?>>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=<?php echo CHARSET; ?>" />
<!-- start of goolge details here -->
<meta name="robots" content="noodp">
<META NAME="Author" CONTENT="Gerardo Suarez, meds.com.mx@gmail.com">
<link rel="shortcut icon" type="image/x-icon" href="<?php echo (($request_type == 'SSL') ? HTTPS_SERVER : HTTP_SERVER) . DIR_WS_CATALOG."images/favicon.ico"; ?>">
<!-- end of goolge details here -->
<?php include DIR_WS_INCLUDES.FILENAME_HEADER_TAGS; ?>


<base href="<?php echo (($request_type == 'SSL') ? HTTPS_SERVER : HTTP_SERVER) . DIR_WS_CATALOG; ?>" />
<link rel="stylesheet" type="text/css" href="ext/jquery/ui/redmond/jquery-ui-1.10.4.min.css" />
<script type="text/javascript" src="ext/jquery/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="ext/jquery/ui/jquery-ui-1.10.4.min.js"></script>

<?php
  if (tep_not_null(JQUERY_DATEPICKER_I18N_CODE)) {
?>
<script type="text/javascript" src="ext/jquery/ui/i18n/jquery.ui.datepicker-<?php echo JQUERY_DATEPICKER_I18N_CODE; ?>.js"></script>
<script type="text/javascript">
$.datepicker.setDefaults($.datepicker.regional['<?php echo JQUERY_DATEPICKER_I18N_CODE; ?>']);
</script>
<?php
  }
?>

<script type="text/javascript" src="ext/photoset-grid/jquery.photoset-grid.min.js"></script>

<link rel="stylesheet" type="text/css" href="ext/colorbox/colorbox.css" />
<script type="text/javascript" src="ext/colorbox/jquery.colorbox-min.js"></script>

<link rel="stylesheet" type="text/css" href="ext/960gs/<?php echo ((stripos(HTML_PARAMS, 'dir="rtl"') !== false) ? 'rtl_' : ''); ?>960_24_col.css" />

<link rel="stylesheet" type="text/css" href="stylesheet-theme.css" />

<link href="jquerysctipttop.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="themes/default/default.css" type="text/css" media="screen" />
<link rel="stylesheet" href="nivo-slider.css" type="text/css" media="screen" />


<!-- <link rel="stylesheet" type="text/css" href="stylesheet.css" /> -->
<?php // echo $oscTemplate->getBlocks('header_tags'); ?>
<?php if ($c_file == 'product_info.php') { ?>
<style type="text/css">
    .buttonSet { margin-top: 10px;}
    #piGal { margin-bottom: 10px;}
    </style>
<?php } ?>    
</head>
<body class="<?php echo ($c_file == FILENAME_DEFAULT) ? 'page-home' : 'page-inner'; ?>">





<table border="0" cellspacing="0" cellpadding="0" class="main_table" align="center">
  <tr>
    <td>
        <?php  require(DIR_WS_INCLUDES . 'header.php'); ?>
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="left" valign="top" class="left_part"><table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td class="box_corner">&nbsp;</td>
                <td class="box_top_center">&nbsp;</td>
              </tr>
            </table>
            <table width="100%" border="0" cellpadding="0" cellspacing="0" class="box_center">
              <tr>
                <td class="mainmenu_link"><a href="<?php echo tep_href_link(FILENAME_DEFAULT) ?>" <?php  if ($c_file==FILENAME_DEFAULT) echo 'id="active"'; ?> ><?php echo HEADER_TITLE_HOME?></a> <a <?php  if ($c_file==FILENAME_PRODUCTS_NEW) echo 'id="active"'; ?> href="<?php echo tep_href_link(FILENAME_PRODUCTS_NEW)?>"><?php echo HEADER_TITLE_NEW_PRODUCTS;?></a> <a <?php  if ($c_file==FILENAME_SPECIALS) echo 'id="active"'; ?> href="<?php echo tep_href_link(FILENAME_SPECIALS)?>"><?php echo MODULE_BOXES_SPECIALS_TITLE?></a> <a href="<?php echo tep_href_link(FILENAME_ABOUT_US)?>" <?php  if ($c_file==FILENAME_ABOUT_US) echo 'id="active"'; ?>><?php echo HEADER_TITLE_ABOUT_US?></a> <a href="<?php echo tep_href_link(FILENAME_CONTACT_US)?>" <?php  if ($c_file==FILENAME_CONTACT_US) echo 'id="active"'; ?>><?php echo MODULE_BOXES_INFORMATION_BOX_CONTACT?></a><a href="<?php echo tep_href_link(FILENAME_REQUEST_MEDICINE)?>" <?php  if ($c_file==FILENAME_REQUEST_MEDICINE) echo 'id="active"'; ?>><?php echo HEADER_TITLE_REQUEST_A_MEDICINE; ?></a></td>
              </tr>
              <tr>
                  <td>
                      
                      <div id="socialleft" style="text-align: center;">
<a href="https://www.facebook.com/MedicinaMexico" target="_blank"><img src="http://www.meds.com.mx/images/left_facebook.png" border="0" alt="" width="40" height="40"></a>
<a href="https://www.youtube.com/watch?v=m-yi5BYjNIM" target="_blank"><img src="http://www.meds.com.mx/images/youtube.png" borde\
r="0" alt="" width="40" height="40"></a>
<a href="https://twitter.com//MedicinaMexico1" target="_blank"><img src="http://www.meds.com.mx/images/left_twitter.png" border="0" alt="" width="40" height="40"></a>
<a href="http://www.pinterest.com/enrique4726/medicina-mexico-httpwwwmedscommx/" target="_blank"><img src="http://www.meds.com.mx/images/left_pinterest.png" border="0" alt="" width="40" height="40"></a>
</div>
                  </td>
              </tr>
            </table>
              
            <table width="100%" border="0" cellpadding="0" cellspacing="0" class="box_padding">
              <tr>
                <td class="box_top_center">&nbsp;</td>
                <td class="box_right_corner">&nbsp;</td>
              </tr>
            </table>
              <?php
  if ($oscTemplate->hasBlocks('boxes_column_left')) { 

  echo $oscTemplate->getBlocks('boxes_column_left'); 
}
?>
            </td>
          <td align="left" valign="top" class="center_part"><div class="banner_padding"><div id="wrapper">
<div class="slider-wrapper theme-default">
<div id="slider" class="nivoSlider"><?php if(cos_banner_exists('HOME_1')) cos_display_banner('HOME_1','dynamic'); ?> </div>
</div>
</div></div>
              
            
<script type="text/javascript" src="jquery.nivo.slider.js"></script> 
<script type="text/javascript">
    $(window).load(function() {
        $('#slider').nivoSlider();
    });
    </script> 
            
<div class="banner_padding"><?php if(cos_banner_exists('HOME_2'))  cos_display_banner('HOME_2'); ?></div>
    