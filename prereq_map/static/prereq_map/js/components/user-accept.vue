<template>
  <div>
    <b-modal
      id="userAcceptance"
      size="md"
      centered
      scrollable
      no-close-on-backdrop
    >
      <template v-slot:modal-header>
        <h1 class="h4 m-0">
          Welcome to Prereq Map
        </h1>
      </template>

      <div class="text-left p-4">
        <p>Here are some important notes before using Prereq Map:</p>
        <ul class="font-weight-lighter">
          <li>
            Prereq Map shows current prerequisites. When planning several
            quarters out, keep in mind that prerequisites may change over time.
          </li>
          <li>
            Prereq Map is based solely on course prerequisites and does not take
            into account specific requirements for graduation.
          </li>
          <li>
            Not all equivalencies (e.g. placement tests) are represented in the
            map – just courses. You can find some equivalencies in the text
            description.
          </li>
        </ul>
      </div>

      <template v-slot:modal-footer>
        <b-container>
          <b-row>
            <b-col sm="9">
              <p>Remember to talk to your adviser when course planning.</p>
            </b-col>
            <b-col sm="3" class="text-center">
              <b-button
                @click="accept"
                variant="primary"
                size="md"
                class="mt-2 mb-3"
              >
                I got it!
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </b-modal>
  </div>
</template>

<script>
  import Vue from "vue";
  import VueCookies from "vue-cookies";
  Vue.use(VueCookies);

  export default {
    model: {
      prop:"userAccepted",
      event:"update",
    },
    props: {
      userAccepted: Boolean,
    },
    data() {
      return {};
    },
    mounted() {
      // check if valid cookie exists and user has not yet accepted terms
      if (this.$cookies.get("prereq-accepted") == "false") {
        // show the onboarding modal
        this.$bvModal.show("userAcceptance");
      }
    },
    methods: {
      // handle the 'get started' button click event
      accept: function() {
        // get the end of term date and set as the expiration value
        var expires = this.$cookies.get("prereq-accepted-expires");
        // set the accept cookie value to true and set the expiration
        this.$cookies.set("prereq-accepted", "true", expires);
        this.$cookies.remove("prereq-accepted-expires");

        // hide the modal (until end of the current term)
        this.$bvModal.hide("userAcceptance");

        // set virtual page view for user accepted
        this.$ga.page({
          page: "/vpv/accepted/",
          title: "Onboarding accepted"
        });

        // updated userAccepted v-model
        this.$emit("update",true);

      }
    }
  };
</script>

<style lang="scss">

  @import 'node_modules/bootstrap/scss/mixins';

  .modal-backdrop {
    height: 100% !important;
    opacity: 0.8;
    width: 100% !important;
  }

  .modal-body {
    padding: 0 !important;
  }
</style>
