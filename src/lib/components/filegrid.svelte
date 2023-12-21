<script>
    import { RecursiveTreeView } from "@skeletonlabs/skeleton";
    import { nodes } from "$lib/treeContent";
    /**
     * @type {TreeViewNode[]}
     */
    let myTreeViewNodes = nodes;
    /**
     * @type {string[]}
    */
    let checkedNodes;
    /**
     * @type {string[]}
    */
    let indeterminateNodes;

    // To show checkedNodes & indeterminateNodes
    // function handleClick() {
    // console.log('Checked Nodes:', checkedNodes);
    // console.log('Indeterminate Nodes:', indeterminateNodes);
    //   }
                            
</script>

<div class = 'w-1/2'>
<RecursiveTreeView selection multiple relational {myTreeViewNodes} bind:checkedNodes={checkedNodes} bind:indeterminateNodes={indeterminateNodes} />
</div>
<!-- To show checkedNodes & indeterminateNodes -->
<!-- <RecursiveTreeView selection multiple relational {nodes} bind:checkedNodes={checkedNodes} bind:indeterminateNodes={indeterminateNodes} on:click={handleClick} /> -->

