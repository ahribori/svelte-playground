<script>
import { Link } from 'svelte-routing';

export let to = '';
export let label = '';
</script>

<Link to="{to}">
  <span
    class="inline-block p-1.5 m-1.5 text-purple-600 border-2 border-purple-500 rounded-md border-dashed">
    {label}
  </span>
</Link>
