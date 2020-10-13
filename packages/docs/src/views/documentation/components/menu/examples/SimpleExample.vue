<template>
	<b-menu tag="article" class="is-light padding-size-6">
		<b-menu-label>
			Menu
		</b-menu-label>
		<b-menu-list>
			<b-menu-list-item>
				<a>Info</a>
			</b-menu-list-item>
			<b-menu-list-item>
				<b-menu-group is-expandable is-expanded>
					<template #menu-label>
						Administrator
					</template>
					<template #default>
						<b-menu-list-item class="is-active">
							<user-icon></user-icon>
							<a>
								Users
							</a>
						</b-menu-list-item>
						<b-menu-list-item>
							<phone-icon></phone-icon>
							<a>
								Devices
							</a>
						</b-menu-list-item>
						<b-menu-list-item>
							<payments-icon></payments-icon>
							<a>Payments</a>
						</b-menu-list-item>
					</template>
				</b-menu-group>
			</b-menu-list-item>
			<b-menu-list-item>
				<a>My Account</a>
			</b-menu-list-item>
			<b-menu-list-item>
				<a>Expo</a>
			</b-menu-list-item>
			<b-menu-group>
				<template #menu-label>
					Actions
				</template>
				<template #default>
					<b-menu-list-item>
						<a>Logout</a>
					</b-menu-list-item>
				</template>
			</b-menu-group>
		</b-menu-list>
	</b-menu>
</template>
<script lang="ts">
import { faCreditCard } from '@fortawesome/free-solid-svg-icons/faCreditCard';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons/faMobileAlt';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { useFontAwesomeIconComponent } from 'buetify/lib/components/icons/utils';
import BMenu from 'buetify/lib/components/menu/BMenu';
import BMenuGroup from 'buetify/lib/components/menu/BMenuGroup';
import BMenuLabel from 'buetify/lib/components/menu/BMenuLabel';
import BMenuList from 'buetify/lib/components/menu/BMenuList';
import BMenuListItem from 'buetify/lib/components/menu/BMenuListItem';
import { defineComponent } from 'vue';

const UserIcon = useFontAwesomeIconComponent('User', faUser);
const PhoneIcon = useFontAwesomeIconComponent('Phone', faMobileAlt);
const PaymentsIcon = useFontAwesomeIconComponent('Payments', faCreditCard);

export default defineComponent({
	name: 'font-awesome-icons-example',
	components: {
		BMenu,
		BMenuGroup,
		BMenuListItem,
		BMenuLabel,
		BMenuList,
		UserIcon,
		PhoneIcon,
		PaymentsIcon
	}
});
</script>
