import { defineComponent, h, PropType } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PluginOptionsByType } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
    name: 'BarChart',
    components: { Bar },
    props: {
        chartId: {
            type: String,
            default: 'bar-chart'
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 400
        },
        cssClasses: {
            default: '',
            type: String
        },
        percentAdolescentsUsers: {
            type: Number,
            default: 0,
            required: false
        },
        fuelEmissionUsers: {
            type: Number,
            default: 0,
            required: false
        },
        filterByDrivetrainUsers: {
            type: Number,
            default: 0,
            required: false
        },
       
        
    },
    setup(props) {
        const chartData = {
            labels: ["Adolescents Users","targetables that care about fuel emissions", "targetables that picked FWD or “I don’t know” for drivetrain"],

            datasets: [
                 { 
                    label: "Data ",
                data: [props.percentAdolescentsUsers, props.fuelEmissionUsers, props.filterByDrivetrainUsers],
                backgroundColor: ["#c39797", "#889d9e", "#ff4040"]
            },
              ]
        }

        const chartOptions = { responsive: true }

        return () =>
            h(Bar, {
                chartData,
                chartOptions,
                chartId: props.chartId,
                width: props.width,
                height: props.height,
                cssClasses: props.cssClasses,
              
            })
    }
})
