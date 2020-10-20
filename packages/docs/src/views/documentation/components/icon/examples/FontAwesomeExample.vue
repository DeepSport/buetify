<template>
	<section aria-label="b-icon examples with font awesome 5">
		<div class="block">
			<user-icon size="is-small"> </user-icon>
			<home-icon size="is-small"> </home-icon>
			<tachometer-alt-icon size="is-small"> </tachometer-alt-icon>
		</div>

		<div class="block">
			<user-icon> </user-icon>
			<home-icon> </home-icon>
			<tachometer-alt-icon> </tachometer-alt-icon>
		</div>

		<div class="block">
			<user-icon size="is-medium"> </user-icon>
			<home-icon size="is-medium"> </home-icon>
			<tachometer-alt-icon size="is-medium"> </tachometer-alt-icon>
		</div>

		<div class="block">
			<user-icon size="is-large" variant="is-success"> </user-icon>
			<home-icon size="is-large" variant="is-info"> </home-icon>
			<tachometer-alt-icon size="is-large" variant="is-primary"> </tachometer-alt-icon>
		</div>

		<div class="buttons">
			<b-button variant="is-dark">
				<check-icon></check-icon>
				<span>Finish</span>
			</b-button>

			<b-button variant="is-warning">
				<check-icon></check-icon>
				<span>Finish</span>
			</b-button>

			<b-button variant="is-warning">
				<sync-alt-icon icon-class="fa-spin"> </sync-alt-icon>
				<span>Refresh</span>
			</b-button>
		</div>
	</section>
</template>
<script lang="ts">
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons/faSyncAlt';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons/faTachometerAlt';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { BButton } from 'buetify/lib/components';
import { useFontAwesomeIconComponent } from 'buetify/lib/components/icons/utils';
import { defineComponent } from 'vue';

const TachometerAltIcon = useFontAwesomeIconComponent('TachometerAlt', faTachometerAlt);
const UserIcon = useFontAwesomeIconComponent('User', faUser);
const HomeIcon = useFontAwesomeIconComponent('Home', faHome);
const CheckIcon = useFontAwesomeIconComponent('Check', faCheck);
const SyncAltIcon = useFontAwesomeIconComponent('SyncAlt', faSyncAlt);

export default defineComponent({
	name: 'font-awesome-icons-example',
	components: {
		BButton,
		UserIcon,
		HomeIcon,
		CheckIcon,
		SyncAltIcon,
		TachometerAltIcon
	}
});
</script>
