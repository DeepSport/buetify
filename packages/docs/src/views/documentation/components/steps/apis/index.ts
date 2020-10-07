import { ComponentApiDescription } from '../../../../../components/apiView';

export const apis: ComponentApiDescription[] = [
	{
		title: 'Steps',
		props: [
			{
				name: '<code>v-model</code>',
				description: 'Binding value, step index. Passing undefined will show the first step',
				type: 'Number',
				values: '—',
				default: '<code>undefined</code>',
				required: 'false'
			},
			{
				name: '<code>is-animated</code>',
				description: 'Steps have slide animation',
				type: 'Boolean',
				values: '—',
				default: '<code>true</code>',
				required: 'false'
			},
			{
				name: '<code>variant</code>',
				description: 'Default color variant for the steps, optional',
				type: 'String',
				values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
				default: '—',
				required: 'false'
			},
			{
				name: '<code>size</code>',
				description: 'Size of the step, optional',
				type: 'String',
				values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>is-vertical</code>',
				description: 'Display the steps vertically',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>position</code>',
				description: 'Position of the vertical step, optional',
				type: 'String',
				values: '<code>is-right</code>',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>label-position</code>',
				description: 'Position of the marker label, optional',
				type: 'String',
				values: '<code>is-right</code>, <code>is-left</code>',
				default: '-',
				required: 'false'
			},
			{
				name: '<code>is-rounded</code>',
				description: 'Rounded step markers',
				type: 'Boolean',
				values: '—',
				default: '<code>true</code>',
				required: 'false'
			},
			{
				name: '<code>mobile-mode</code>',
				description: 'How Steps will be displayed for mobile user',
				type: 'String',
				values: `<code>minimal</code>: Only the active Step is displayed,
                    <code>compact</code>: Step label is displayed only for the active,
                    <code>null</code>: Will keep the same behavior as desktop`,
				default: '<code>minimal</code>',
				required: 'false'
			}
		],
		slots: [
			{
				name: 'default',
				description: 'Step body where <code>b-step-item</code> can be included',
				props: '—'
			}
		],
		events: [
			{
				name: '<code>update:model-value</code>',
				description: 'Triggers when active step is changed',
				parameters: '<code>value: Number</code>'
			}
		],
	},
	{
		title: 'Item',
		props: [
			{
				name: '<code>step</code>',
				description: 'Step marker content (when there is no icon) - will show step index as default',
				type: 'String',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>label</code>',
				description: 'Step label',
				type: 'String',
				values: '—',
				default: '—',
				required: 'true'
			},
			{
				name: '<code>variant</code>',
				description: `Color variant for the step, optional
                    This will override parent type. Could be used to set a completed step to
                    <code>is-success</code> for example`,
				type: 'String',
				values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
				default: '—',
				required: 'false'
			},
			{
				name: '<code>icon</code>',
				description: 'Icon component to be used inside navigation marker',
				type: '[Object, Function]',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>is-clickable</code>',
				description: `Item can be used directly to navigate.
                    If undefined, previous steps are clickable while the others are not.`,
				type: 'Boolean',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>is-visible</code>',
				description: 'Item is visible',
				type: 'Boolean',
				values: '-',
				default: 'true',
				required: 'false'
			}
		],
		slots: [
			{
				name: 'default',
				description: 'Step item body',
				props: '—'
			}
		]
	}
];
