# For Custom Code Help 
# https://chauhan07.github.io/codepress/

# Custom WordPress Theme README

Welcome to the custom WordPress theme! This theme is a basic, fresh, and empty template with necessary placeholders for your website. Below is an overview of the theme structure and file details.

## Theme Structure

### Root Directory Templates
- **front-page.php**: Template for the home page.
- **home.php**: Template for blog pages.
- **page.php**: Template for singular pages.
- **single.php**: Template for single posts.
- **archive.php**: Template for Categories/tags/Author etc Posts.

### Single Post Templates
- **template-parts/single/**: Folder containing different templates for single blog posts.

### Custom Post Types
- **single-[cpt-name].php**: Template for custom post types. Create a new file inside the *template-parts/single/* for each custom post type with the naming convention `single-[cpt-name].php`. If no custom template is created, the single post will use the design from `single.php`.

## WooCommerce Integration
- **[assets/css/woocommerce/style.css]**: Default design for WooCommerce pages such as shop, cart, checkout, and thank you. This design will be applied if the WooCommerce plugin is installed.

## Custom Templates
- **templates/**: Use this folder to create custom templates.

## Inc Folder
- **\inc\theme\customizer.php**: Contains code related to the customizer. This file allows you to design login/signup pages using custom controls and includes relevant CSS.
- **login_p_design.php**: Contains CSS related to the customizer.
- **c_editor_c_widgets.php**: Contains code to disable the Gutenberg editor.

## Features
1. **Basic Theme Structure**: A fresh and empty theme with essential templates.
2. **WooCommerce Compatibility**: Default setup and styling for WooCommerce pages.
3. **Custom Templates**: Easy creation of custom templates within the `templates` folder.
4. **Customizer Integration**: Customizer settings and designs for login/signup pages.
5. **Gutenberg Editor Disabled**: File included to disable the Gutenberg editor.

## Usage
1. **Home Page**: Use `front-page.php` for the home page.
2. **Blog Pages**: Use `home.php` for blog pages.
3. **Singular Pages**: Use `page.php` for singular pages.
4. **Single Posts**: Use `single.php` for single posts.
5. **Custom Post Types**: Create `single-[cpt-name].php` for custom post types.
6. **WooCommerce Pages**: Styles are located in `[assets/css/woocommerce/style.css]`.

## Customizer
- Access the customizer settings for login/signup page design via `\inc\theme\customizer.php`.
- Related CSS can be found in `login_p_design.php`.

## Disabling Gutenberg Editor
- The Gutenberg editor is disabled. Relevant code is found in `c_editor_c_widgets.php`.

## Additional Notes
- Keep templates organized within their respective folders.
- Customize WooCommerce page styles within the specified CSS file.
- Extend functionality and design using the customizer and template parts.

Enjoy building with your custom WordPress theme!