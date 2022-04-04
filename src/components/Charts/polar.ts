import { defineComponent, h, PropType } from 'vue'
import { PolarArea } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PluginOptionsByType, ArcElement, ArcBorderRadius, ArcHoverOptions,ArcOptions, PointElement , PointOptions, RadialLinearScale} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, RadialLinearScale)

export default defineComponent({
    name: 'PolarAreaChart',
    components: { PolarArea },

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
                    label: "Data One",
                    backgroundColor: ["#a3c7c9", "#009999", "#e44c62", "#ffc71e"],
                    data: [props.percentAdolescentsUsers, props.firstimersUsers, props.unlicensedUsers]
                }
            ]
        }

        const chartOptions = { responsive: true }

        return () =>
            h(PolarArea, {
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
