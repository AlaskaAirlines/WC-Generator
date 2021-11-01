---
name: Publish Component
about: Create a ticket to drive compliance before publishing a new component to Auro Design System
title: 'Publish to Auro Design System'
labels: '[namespace]-[name], not-reviewed'
---

# Publish Component

## Specific steps required to publish this component.

1. __Design & Planning__
    - [ ] Reviewed [AuroLabs documentation](http://auro.alaskaair.com/)
    - [ ] Reviewed [Auro's Contributing Guidelines](http://auro.alaskaair.com/contributing)
    - [ ] Reviewed [Auro's CSS conventions](http://auro.alaskaair.com/webcorestylesheets/conventions) and how to apply CSS to custom elements
    - [ ] Design team engaged in designing the new component
    - [ ] Design work integrated in the Auro Design System UI Kit
1. __Development__
    - [ ] Addresses all design and UX as proposed in the design comp
    - [ ] A11y in regards to role and live notifications need to be coded into the final WC
    - [ ] All style code follows [Auro's Style Guide](http://auro.alaskaair.com/webcorestylesheets/guidelines)
    - [ ] Automated tests created
1. __Documentation__
    - `demo.md`
      - [ ] Component properly described
      - [ ] Custom element's full API is documented
      - [ ] Component use case(s) outlined
      - [ ] `Do Not` section outlines implementation scenarios to avoid
      - Example Section
        - [ ] Basic example of simplest use case
        - [ ] Examples showing use of each API attribute
        - [ ] All examples include rendered example and matching code sample
    - `readme.md`
      - [ ] Component properly described
      - [ ] Bundled version info
      - [ ] Use cases described
      - [ ] `API Code Examples` updated to match API with working example code
    - [ ] `API.md` document created and matches current API
1. __Testing__
    - [ ] Component built using latest version of [WC-Generator](http://auro.alaskaair.com/getting-started/developers/generator/install)
    - [ ] All automated tests pass and coverage threshold requirements are met
    - [ ] [Browser compatibility](http://auro.alaskaair.com/support/browsersSupport) - desktop and mobile versions
    - [Accessibility](http://auro.alaskaair.com/a11y-statement) - One or more of the following
      - [ ] Axe / Google Lighthouse (baseline standard)
      - [ ] Screenreader (determine usability of experience via screenreader)
      - [ ] Keyboard use (a user must be able to navigate to key parts via a keyboard)
      - [ ] Accessibility should be verified against all browsers
    - [ ] Bundled versions tested
1. __Review__ <br/>
    When the component is ready for a final review it is the responsibility of the contributor to coordinate the following reviews:
    - [ ] Reviewed demo with the designer
    - [ ] Reviewed demo with Auro Team
    - [ ] All work is reviewed by Auro team
1. __Publishing__
    - [ ] Removed all references to `auroLabs` from the repository
    - [ ] Component properly named,  e.g. `auro-[name]`
    - [ ] GitHub Repository properly named
    - Updated `readme.md`
      - [ ] Install information updated to published namespace
      - [ ] `Define dependency in project component` updated to published namespace
      - [ ] `Bundle example code` updated to published namespace
    - [ ] PR prepared to include demo page in the Auro Doc Site

