import { defineComponent, h, PropType } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PluginOptionsByType, ArcElement, ArcBorderRadius, ArcHoverOptions,ArcOptions, PointOptions} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement)

export default defineComponent({
    name: 'BarChart',
    components: { Doughnut },

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
        firstimersUsers: {
            type: Number,
            default: 0,
            required: false
        },
        unlicensedUsers: {
            type: Number,
            default: 0,
            required: false
        },
        
        
        
    },
    setup(props) {
        const chartData = {
            labels: ["Adolescents Users", "firstimers Users", "unlicensed Users"],
            datasets: [
                {
                    label: "Data",
                    backgroundColor: ["#3b5998", "#8b9dc3", "#647678", "#eea990"],
                    data: [props.percentAdolescentsUsers, props.firstimersUsers, props.unlicensedUsers]
                }
            ]
        }

        const chartOptions = { responsive: true }

        return () =>
            h(Doughnut, {
                chartData,
                chartOptions,
                chartId: props.chartId,
                width: props.width,
                height: props.height,
                cssClasses: props.cssClasses,
                styles: props.styles,
                plugins: props.plugins
            })
    }
})
