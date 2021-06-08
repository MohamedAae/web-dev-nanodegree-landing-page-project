# Landing Page Project

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Instructions](#instructions)
- [Technical Details](#technical)

## Description

Udacity web development Nanodegree project, Dynamically generating navigation menu based on the sections.  
**author:** Mohamed Aae  
**author's URL:** https://github.com/MohamedAae

## Features

- Dynamically generate navigation.
- Highlight both the active list item and the corresponding section.
- Smooth scroll to the clicked list item.
- Back to top button with smooth scrolling.

## Instructions

- Several elements need to keep their structure to make this script working correctly. for `index.html` Your nav list must have the id of `navbar__list`
- When adding a new section, make sure it includes the `data-nav` & `id` attributes. These attributes are utilized to generate both the list item title and href accordingly.
- Don't use the `scroll__top` class for anything but the back to top button.

## Technical

Most of the work for generating the nav and back to top button is in the `js/app.js` file.

### &mdash; Nav Menu:

- `buildTheNav()` loops through document sections, get the title from the data-nav attribute, and the id from the id attribute. Builds the list item and append it to a `DocumentFragment()`.
- The `DocumentFragment()` is appeneded to the `navbar__list` after DOMContentLoaded.

### &mdash; Back to the top button:

- The button structure for html `<button class="scroll__top">Top</button>`
- `hideBackToTop()` automatically hides the button if the user is near the top, using the scrollTop in a conditional block to achieve that.

### &mdash; DOMContentLoaded Event Listener

- `buildTheNav()` start building the nav and appending it once done.
- `addMarginToMain()` adding a margin to the `<main>` element to accurately display it, dynamically calculating the nav height, and add margin based on the value returned.
- `scrollingActiveListItem()` Detect the active section after reload and highlight both the nav item and corresponding section. It searches for a section with the `active-section` class and set the `active` class to the same list item with the same textContent as the section's `data-nav` attribute.

### &mdash; NAVIGATION_MENU Click Even Listener:

- `scrollToSection(e.target)` detected the list item clicked using event delegation, and pass the value to the function to smooth scroll to the selected section.

### &mdash; Scroll Event Listener:

This event listener is using a `setTimeOut()` Method to detect when the user stops scrolling.

- `viewportActiveSection()` dectects which section is currently in the viewport using the `getBoundingClientRect()` method and adds `active-section` class to it.
- `scrollingActiveListItem()`
- `hideNav()` with a string passed to set the nav display property. If the 'scrolling' value passed, the navigation menu display will be flex, otherwise none.
- `hideBackToTop()` hides the back to top button, It's called only if the user is scrolling.

### &mdash; BACK_TO_TOP Click Event Listener:

- `scrollToTop()` smooth scroll to top of the document using the `scrollTo()` method.
