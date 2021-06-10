<template>
  <div v-if="!isLoading">
    <!-- <time-table />
    <div class="d-flex align-center flex-column py-12">
      <div>TimeTable</div>
      <v-dialog v-model="dialog2"
                persistent
                max-width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <span>
            <v-btn
              style="min-width: 0"
              outlined
              v-bind="attrs"
              small
              v-on="on"
              @click="
                dialog2 = true;
                convertToURL();
              "
            >
              <v-icon small>mdi-share</v-icon>
            </v-btn>
          </span>
        </template>
        <v-card class="pa-6">
          <v-card-text>以下のリンクで、時間割を共有できます</v-card-text>
          <v-text-field
            id="input"
            v-model="convertedURL"
            :prepend-icon="'mdi-clipboard-text-multiple-outline'"
            readonly
            @click:prepend="doCopy"
          />

          <v-card-actions>
            <v-chip
              v-if="copiedURL"
              class="ma-2"
              color="teal"
            >
              <v-avatar left>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-avatar>
              Copied!
            </v-chip>
            <v-spacer />
            <v-btn
              color="green darken-1"
              text
              @click="closeDialog"
            >
              完了
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ShareModal',
});
</script>
