import { ComponentApiDescription } from '../../../../../components/apiView';
import { getUseToggleEventsApi, getUseTogglePropsApi } from '../../../shared/api';

export const apis: ComponentApiDescription[] = [
	{
		title: 'Snackbar',
		props: [
			{
				name: '<code>variant</code>',
				description:
					'Type (color) of the action button. Please notice that it is the name of the parent class also',
				type: 'String',
				values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
				default: '<code>is-success</code>',
				required: 'false'
			},
			{
				name: '<code>message</code>',
				description:
					'Message text (can contain HTML). <div class="notification is-danger">Dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to <a href="https://en.wikipedia.org/wiki/Cross-site_scripting" target="_blank" rel="noopener">XSS vulnerabilities</a>. Only use HTML interpolation on trusted content and never on user-provided content.</div>',
				type: 'String, Array<VNode>',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>position</code>',
				description: 'Which position the snackbar will appear',
				type: 'String',
				values:
					'<code>is-top-right</code>, <code>is-top</code>, <code>is-top-left</code>, <code>is-bottom-right</code>, <code>is-bottom</code>, <code>is-bottom-left</code>',
				default: '<code>is-bottom-right</code>',
				required: 'false'
			},
			{
				name: '<code>duration</code>',
				description: 'Visibility duration in miliseconds',
				type: 'Number',
				values: '—',
				default: '<code>3500</code>',
				required: 'false'
			},
			{
				name: '<code>shouldQueue</code>',
				description: 'If should queue with others notices (snackbar/toast/notification)',
				type: 'Boolean',
				values: '—',
				default: '<code>true</code>',
				required: 'false'
			},
			{
				name: '<code>is-indefinite</code>',
				description: 'Show the Snackbar indefinitely until it is dismissed',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>action-text</code>',
				description: `Snackbar's button text, set <code>null</code> for buttonless`,
				type: 'String',
				values: '—',
				default: '<code>OK</code>',
				required: 'false'
			},
			{
				name: '<code>on-action</code>',
				description: 'Callback function when the button is clicked',
				type: 'Function',
				values: '—',
				default: '—',
				required: 'false'
			}
		],
		slots: [
			{
				name: 'default',
				description: 'Slot for trigger to open BSnackbar',
				props: '<code>open: IO<void></code>'
			},
			{
				name: 'message',
				description: 'Message inside snackbar',
				props: '-'
			},
			{
				name: 'action',
				description: 'Text to display inside action button',
				props: '-'
			}
		]
	}
];
