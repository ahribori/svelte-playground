<style>
main {
  text-align: center;
  padding: 1em;
  max-width: 240px;
  margin: 0 auto;
}

h1 {
  color: #ff3e00;
  text-transform: uppercase;
  font-size: 4em;
  font-weight: 100;
}

@media (min-width: 640px) {
  main {
    max-width: none;
  }
}
</style>

<script lang="ts">
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
</main>

<div
  class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
  <div class="md:flex">
    <div class="md:flex-shrink-0">
      <img
        class="h-48 w-full object-cover md:w-48"
        src="https://images.unsplash.com/photo-1515711660811-48832a4c6f69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80"
        alt="Man looking at item at a store" />
    </div>
    <div class="p-8">
      <div
        class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
        Case study
      </div>
      <a
        href="#"
        class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
        >Finding customers for your new business</a>
      <p class="mt-2 text-gray-500">
        Getting a new business off the ground is a lot of hard work. Here are
        five ideas you can use to find your first customers.
      </p>
    </div>
  </div>
</div>
