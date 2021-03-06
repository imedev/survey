import { defineComponent, h, PropType } from 'vue'
import { Radar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PluginOptionsByType, ArcElement, ArcBorderRadius, ArcHoverOptions,ArcOptions, PointElement , PointOptions, RadialLinearScale, RadialScaleTypeRegistry, LineElement} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, RadialLinearScale, LineElement)

export default defineComponent({
    name: 'RadarChart',
    components: { Radar },

    props: {
        percent: {
            default: 0
        },
        foregroundColor: {
            type: String,
            default: "#1993ff"
        },
        backgroundColor: {
            type: String,
            default: "#ecf6ff"
        },
        strokeWidth: {
            type: Number,
            default: 10
        },
        radius: {
            type: Number,
            default: 85
        },
        width: {
            type: Number,
            default: 200
        },
        height: {
            type: Number,
            default: 200
        },
        classValue: {
            type: String,
            default: ""
        },
        visibleValue: {
            type: Boolean,
            default: false
        },
        valueCountUp: {
            type: Boolean,
            default: false,
            required: false
        },
        valueCountUpDuration: {
            type: Number,
            default: 2000,
            required: false
        },
        valueCountUpDelay: {
            type: Number,
            default: 500,
            required: false
        },
        customPercentSize: {
            type: Number,
            default: 40,
            required: false
        },
        passTextAsHtml: {
            type: Boolean,
            default: false
        },
        customText: {
            type: String,
            default: ""
        },
        customTextColor: {
            type: String,
            default: '',
            required: false
        },
        customTextSize: {
            type: Number,
            default: 15,
            required: false
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
            labels: ["targetables that care about fuel emissions", "targetables that picked FWD or ???I don???t know??? for drivetrain","Adolescents Users"],
            datasets: [
                {
                    label: "Data ",
                    backgroundColor: ["#a3c7c9", "#889d9e"],
                    data: [props.fuelEmissionUsers, props.filterByDrivetrainUsers, props.percentAdolescentsUsers]
                }
            ]
        }

        const chartOptions = { responsive: true }

        return () =>
            h(Radar, {
                chartData,
                chartOptions,
                width: props.width,
                height: props.height
            })
    }
})
