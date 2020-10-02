<template>
	<section aria-label="simple b-modal example" class="buttons">
		<b-modal>
			<template #trigger="{ open }">
				<b-button variant="is-primary" @click="open">
					Open Box Modal
				</b-button>
			</template>
			<template #default>
        <b-box class="is-white-bis">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis,
            nibh id hendrerit imperdiet, elit sapien laoreet elit
          </p>
        </b-box>
			</template>
		</b-modal>
    <b-modal>
      <template #trigger="{ open }">
        <b-button variant="is-info" @click="open">
          Open Image Modal
        </b-button>
      </template>
      <template #default>
        <figure class="image is-4by3">
          <img src="@/assets/placeholder-1280x960.png" alt="Image">
        </figure>
      </template>
    </b-modal>
	</section>
</template>
<script lang="ts">
import BButton from 'buetify/lib/components/button/BButton';
import BBox from 'buetify/lib/components/layout/box/BBox';
import BModal from 'buetify/lib/components/modal/BModal';
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
	name: 'simple-modal-example',
	components: {
		BModal,
		BButton,
    BBox
	}
});
</script>
