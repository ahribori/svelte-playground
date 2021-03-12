<script lang="ts">
import Tailwindcss from './Tailwindcss.svelte';
import { Route, Router } from 'svelte-routing';
import Home from './pages/Home.svelte';
import NavigationItem from './components/NavigationItem.svelte';

export let name: string;
export let url = '';
</script>

<Tailwindcss />

<div class="container mx-auto m-4 p-4">
  <Router url="{url}">
    <nav>
      <NavigationItem to="/" label="Home" />
      <NavigationItem to="/example" label="Example" />
    </nav>
    <div>
      <Route path="/" component="{Home}" />
    </div>
  </Router>
</div>
