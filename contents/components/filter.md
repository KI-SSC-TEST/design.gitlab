---
name: Filter
description: Filters allow a user to narrow down content by taking an existing list and removing items based on criteria that matches or doesn’t.
vueComponents:
  - GlFilteredSearch
related:
  - token
  - search
  - list
  - dropdowns
---

## Examples

[[Example:filtered-search]]

Todo: Add Filter to Pajamas UI Kit.

## Structure

Todo: Add structure image.

## Guidelines

### When to use

Todo: Add when to use.

### When not to use

Todo: Add when not to use.

### Appearance

- Filters utilize our [search component](/components/search/) with three main [token](/components/token/) parts:
  1. **key**: acts as the label of the filter value, for example, `assignee`.
  1. **logical operator**: the condition that binds the key to the value, for example, `is` or `is not`.
  1. **value**: the item that the condition will base results on, for example, a `@username`.
- Filters are positioned inline with the text cursor in a search box. The search box becomes horizontally scrollable when the filters can’t fit in it.
- Filters include a [remove icon](http://gitlab-org.gitlab.io/gitlab-svgs/?q=~close) which, when clicked, removes the whole filter from the search box.

### Behavior

- Clicking on any of the three parts of a filter opens a corresponding dropdown for selecting the value for that part of the filter. For example, if a user clicks on the value part of the filter, the value dropdown appears.
- If clicking the operator, the operator dropdown appears and the value part of the filter is removed if the operator is changed.
- If clicking the key, the key dropdown appears and the operator and the value of the filter are removed if the key is changed.
- The text content of the clicked part (operator or key) becomes editable and the text cursor is immediately placed at the end of that text string so that users can either type or select a suggestion from a dropdown.
- Certain keys are compatible so the operator and value don’t need to be removed in the event of change (for example, changing the key from author to assignee).
- If a user selects a different value from the dropdown when editing a text string, that new value replaces the old one.
- If the user clicks anywhere outside the dropdown or the search box, the string is turned back to a token with whatever its value was at the time of the event.
- If a user tries to edit a key with an invalid value, the token is removed and converted to a plain text string.
- If a user tries to edit an operator with an invalid value, the first option is chosen and the invalid text becomes the value text string.
- After a filter is successfully added, a dropdown with suggestions for other keys appears immediately.
- The experience of adding a filter should be as follows:
  1. The user clicks into a search box and a dropdown with the keys that can be used appears.
  1. The user chooses the key of what they want to filter the list by (for example, `assignee`).
  1. The user chooses the logical operator (`is` or `is not`) from a dropdown.
  1. The user chooses the value of the filter from a dropdown (for example, a `@username`).
  1. The user needs to repeat steps 1–4 for each filter they want to use.
  1. Once done, the user needs to confirm the search to trigger it. They do so by clicking on the search button or by using their keyboard.

### Content

- Each part is a variant of a [token](/components/token/).
- Filters are always used in combination with the [“search by confirmation” search box](/components/search/#search-by-confirmation) pattern.
- Each filter can consist of only one value and can’t be repeated. For example, a list of issues can only be narrowed down by specifying one assignee.

### Accessibility

Todo: Add accessibility guidelines.
