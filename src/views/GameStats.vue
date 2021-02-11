<template>
    <div> Game stats 
        <JSCharting :options="options" class="columnChart"></JSCharting>


    </div>
</template>

<script>
import JSCharting from 'jscharting-vue';


export default {
    data(){
        return {
            name: 'columnChart',
            options: {
                type: 'horizontal column',
                series: [
                    {
                        points: [
                            { x: 'A', y: 50 },
                            { x: 'B', y: 30 },
                            { x: 'C', y: 50 }
                        ]
                    }
                ]
            }
        }
    },
    components: {
        JSCharting
    }
}
</script>