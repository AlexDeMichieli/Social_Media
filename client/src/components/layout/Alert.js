import React from 'react'
import PropTypes from 'prop-types'

//Redux to connect the component with Redux
import {connect} from 'react-redux'

const Alert = ({alerts}) => {
    console.log(alerts)
   const errorBanner = alerts!== null && alerts.length > 0 && alerts.map(( alert=>{
        return (

           <div key = {alert.id} className ={`alert alert-${alert.alertType}`}>
            {alert.msg}
           </div> 
        )
    }))
    return errorBanner
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    //alert from reducers(folder)-index(page)
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert)
