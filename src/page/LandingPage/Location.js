import React, {useState} from 'react';
import {Map, Placemark, YMaps} from "react-yandex-maps";

function Location({data}) {

    return (
        <div style={{width: '100%', height: 500}}>
            <YMaps style={{width: '100%', height: 500}}>
                <Map style={{width: '100%', height: 500}} defaultState={{
                    center: [data.lanLat.lan, data.lanLat.lat],
                    zoom: 16,
                    controls: ['zoomControl', 'fullscreenControl']
                }} modules={['control.ZoomControl', 'control.FullscreenControl']}>
                    <Placemark defaultGeometry={[data.lanLat.lan, data.lanLat.lat]}/>
                </Map>
            </YMaps>
        </div>

    );
}

export default Location;