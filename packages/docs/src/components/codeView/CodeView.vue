+<template>
	<section class="codeview">
		<b-title v-if="title" class="codeview-title">{{ title }}</b-title>
		<figure class="highlight" :class="classes">
			<div class="button-container">
				<b-button v-if="isOn && useToggle" class="is-text is-small" @click="setOff">
					Hide
				</b-button>
			</div>
			<pre><code class="hljs" :class="lang === 'html' ? 'xml' : lang" v-html="highlightedCode.value"></code></pre>
			<b-button v-if="isOff && useToggle" class="is-fullheight codeview-showcode" @click="setOn">
				<code-icon size="is-small"></code-icon>
				Show Code
			</b-button>
			<b-button v-if="useToggle" class="codeview-hidecode" @click="setOff">
				<eye-slash-icon size="is-small"></eye-slash-icon>
			</b-button>
		</figure>
	</section>
</template>

<script lang="ts">
import { BButton, BTitle } from 'buetify/lib/components';
import { getUseTogglePropsDefinition, useToggle } from 'buetify/lib/composables';
import { defineComponent, computed, PropType as PType } from 'vue';
import { useHighlightedCode } from '../../shared/composables/useHighlightedCode';
import CodeIcon from '../icons/CodeIcon';
import EyeSlashIcon from '../icons/EyeSlashIcon';

export default defineComponent({
	name: 'code-view',
	components: {
		BTitle,
		BButton,
		CodeIcon,
		EyeSlashIcon
	},
	props: {
		lang: {
			type: String as PType<'typescript' | 'html' | 'bash'>,
			default: 'html' as const
		},
		code: {
			type: String,
			required: true
		},
		title: {
			type: String
		},
		isBordered: {
			type: Boolean,
			default: true
		},
		useToggle: {
			type: Boolean,
			default: true
		},
		...getUseTogglePropsDefinition('isExpanded')
	},
	setup(props) {
		const toggle = useToggle(props, 'isExpanded');
		const classes = computed(() => ({
			'is-collapsed': !props.isBordered && !toggle.isOn.value && props.useToggle,
			'is-expanded': toggle.isOn.value || !props.useToggle
		}));

		return {
			...toggle,
			classes,
			highlightedCode: useHighlightedCode(props)
		};
	}
});
</script>

<style lang="scss">
//from Buefy
.codeview {
	.codeview-title {
		// background: lighten($primary, 10%);
		background: $grey-dark;
		padding-left: 1rem;
		padding-right: 1rem;
		line-height: 2;
		min-height: 0.25rem;
		color: $scheme-main;
		font-size: $size-5;
		border-top-left-radius: $radius;
		border-top-right-radius: $radius;
	}
	.highlight {
		position: relative;
		text-align: left !important;
		height: 3.25rem;
		.button-container {
			position: absolute;
			display: inline-flex;
			background: transparent;
			border-radius: $radius $radius 0 0;
			top: 0.25rem;
			right: 1.35rem;
			padding: 0 0 0 8px;
			vertical-align: top;
			.button {
				display: flex;
				align-items: flex-end;
				padding: 0;
				text-decoration: underline;
				&:not(:last-child) {
					margin-right: 0.5rem;
				}
				.icon {
					margin-left: -2px;
				}
				&:hover,
				&:focus {
					color: $link;
					background: transparent;
				}
			}
		}
		pre {
			padding: 0;
			code {
				overflow: hidden;
				max-height: 600px;
				&.hljs {
					background: inherit;
					color: inherit;
					padding: 1.25rem 1.5rem;
				}
			}
		}
		.codeview-showcode,
		.codeview-hidecode {
			display: flex;
			bottom: 0;
			left: 0;
			position: absolute;
			right: 0;
			top: 0;
			align-items: center;
			background-color: rgba($scheme-main, 0.8);
			border: none;
			color: $grey;
			cursor: pointer;
			font-size: 0.75rem;
			justify-content: center;
			width: 100%;
			font-weight: $weight-semibold;
			&:hover {
				background-color: rgba($warning, 0.8);
			}
			.icon {
				margin-right: 0.5rem;
			}
		}
		.codeview-hidecode {
			position: static;
			height: 2rem;
		}
		&.is-expanded {
			height: auto;
			pre code {
				overflow: inherit;
			}
		}
		&.is-collapsed {
			border: 1px solid $warning;
		}
	}
	&:not(:last-child) {
		margin-bottom: 1.5rem;
	}
}
</style>
