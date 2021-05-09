# Definition of done

The scope of this document is to clearly communicate the Auro team's definition of done.

> Definition of Done: is a formal description of the state of the Increment when it meets the quality measures required for the product. The moment a Product Backlog item meets the Definition of Done, an Increment is born. The Definition of Done creates transparency by providing everyone a shared understanding of what work was completed as part of the Increment. If a Product Backlog item does not meet the Definition of Done, it cannot be released or even presented at the Sprint Review.

[-- Scrum.org: Scrum Glossary](https://www.scrum.org/resources/scrum-glossary)


## Team definition of done

The following items are to be considered the Auro team's agreed upon definition of done with optional exceptions based on scope of story.

1. **Code is complete:** The work submitted by the author is to be considered complete and there are no remaining items to be added to the scope of this update.
1. **Documentation is complete:** Per the scope of the update, one or more of the options may apply.
  - Feature is defined using JSDoc syntax.
  - The demo and example projects (as needed) have been updated to reflect the feature update.
  - Feature or API information has been documented.
  - The commit comments represents the scope of the update and references the issue number.
1. **Design review completed:** If required, the update has been reviewed by design to ensure compliance with expectations.
1. **Browser review:** The update has been reviewed in all major browsers. See [browser support matrix](http://auro.alaskaair.com/support/browsersSupport) for specifics.
1. **Interaction review:** Feature update is reviewed on all leading devices to ensure appropriate experience and expectation of the feature based on device.
	- Desktop / Laptop computer
	- Mobile device (iPhone, Android if possible)
	- Tablet device
1. **Code review completed**: Per the scope of the update, one or more of the options may apply.
	- The update has been assigned to a pull request and has completed a review with at least one other engineer familiar with the code.
	- The update meets the minimum test coverage threshold.
1. **Accessibility:** The update has been reviewed for accessibility impacts.
	- Automated unit tests
	- AXE
	- Screen reader tooling
