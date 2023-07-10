<template>
  <div class="text-white/50 text-md mb-4">
    <nuxt-link class="breadcrumb-link" to="/app">Spaces</nuxt-link> /
    <nuxt-link class="breadcrumb-link" :to="`/app/${crumbs?.space?._id}`">{{
      crumbs?.space.title
    }}</nuxt-link>
    <span v-if="ids && ids.length > 0"> / ...</span>
    <span :key="crumb._id" v-for="crumb of crumbs?.tail">
      / <nuxt-link class="breadcrumb-link" :to="`/app/${crumbs?.space?._id}/${crumb.slug}`">{{
      crumb.title
    }}</nuxt-link>
    </span>
  </div>
</template>

<script setup>
const route = useRoute();
const space_id = route.params.space
const ids = ref(route.params.notes ? [...route.params.notes] : null)
let result, loading = ref(null);
const note_id = ids.value.pop()


const NOTE_QUERY = gql`
  query ($noteID: ID!) {
    noteByID(id: $noteID) {
      _id
      title
      space {
        title
        _id
      }
      parentNote {
        ... on Space {
          title
          _id
        }
        ... on Note {
          title
          _id
          parentNote {
            ... on Note {
              title
              _id
              parentNote {
                ... on Note {
                  title
                  _id
                }
                ... on Space {
                  _id
                  title
                }
              }
            }
            ... on Space {
              _id
              title
            }
          }
        }
      }
    }
  }
`;


function log(...a){
  return console.log(...a)
}


const crumbs = computed(()=>{
  if (!ids.value) return;
  ({ result, loading } = useQuery(NOTE_QUERY, {
    noteID: note_id,
  }));
  if (loading.value) return null;
  //let { noteByID: {title, _id, __typename, parentNote} } = result.value
  let tmp = [] // currently selected note
  let currNote = result.value.noteByID;
  let __typename, title, _id, parentNote;
  const { space } = currNote;
  while (__typename !== "Space"){
    ({title, _id, __typename, parentNote} = currNote);
    if (__typename == "Space") break;
    const slug = ids.value.join('/') + '/' + _id;
    ids.value.pop();
    tmp = [ { title, _id, slug }, ...tmp];
    currNote = parentNote;
  }
  return { tail: tmp, space };
})

</script>

<style>
</style>