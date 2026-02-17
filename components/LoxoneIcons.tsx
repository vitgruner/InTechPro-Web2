import React from 'react';

interface IconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const LoxoneAirIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 68 69" className={className} fill="currentColor">
        <path d="M33.666,67.937 C15.103,67.937 0,52.833 0,34.271 C0,15.707 15.103,0.606 33.666,0.606 C52.229,0.606 67.332,15.707 67.332,34.271 C67.332,52.833 52.229,67.937 33.666,67.937 M33.666,2.106 C15.93,2.106 1.5,16.534 1.5,34.271 C1.5,52.007 15.93,66.437 33.666,66.437 C51.402,66.437 65.832,52.007 65.832,34.271 C65.832,16.534 51.402,2.106 33.666,2.106" />
        <path d="M33.649,51.329 C35.215,51.329 36.484,50.06 36.484,48.494 C36.484,46.929 35.215,45.659 33.649,45.659 C32.083,45.659 30.814,46.929 30.814,48.494 C30.814,50.06 32.083,51.329 33.649,51.329" />
        <path d="M17.15,23.099 L18.946,25.863 C23.182,23.102 28.226,21.481 33.65,21.481 C39.07,21.481 44.113,23.101 48.348,25.86 L50.143,23.096 C45.391,19.998 39.732,18.181 33.65,18.181 C27.564,18.181 21.903,19.999 17.15,23.099" />
        <path d="M21.777,30.223 L23.573,32.988 C26.476,31.095 29.933,29.985 33.649,29.985 C37.363,29.985 40.819,31.094 43.72,32.986 L45.516,30.22 C42.097,27.992 38.026,26.684 33.649,26.684 C29.27,26.684 25.197,27.993 21.777,30.223" />
        <path d="M26.404,37.349 L28.2,40.113 C29.769,39.089 31.639,38.488 33.649,38.488 C35.657,38.488 37.524,39.088 39.093,40.111 L40.888,37.345 C38.802,35.987 36.32,35.189 33.649,35.189 C30.977,35.189 28.492,35.987 26.404,37.349" />
    </svg>
);

export const LoxoneAudioIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 52 53" className={className} fill="none" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7.583 26.349V50.183H27.451" />
        <path d="M1.083 25.266L26 2.516L50.917 25.266" />
        <path d="M34.667 4.683H42.25V12.266" />
        <path d="M29.25 13.349H22.75V19.849H29.25V13.349Z" />
        <path d="M36.713 47.42C36.713 48.802 35.478 50.183 33.951 50.183C32.427 50.183 31.189 48.949 31.189 47.42C31.189 45.896 32.427 44.636 33.951 44.636C36.062 44.636 34.612 44.636 36.713 44.636C36.713 45.557 36.713 46.398 36.713 47.42Z" strokeLinejoin="round" />
        <path d="M47.762 41.863C47.762 43.244 46.526 44.625 45 44.625C43.475 44.625 42.238 43.388 42.238 41.863C42.238 40.338 43.473 39.112 45 39.112C45.503 39.112 47.302 39.112 47.762 39.112C47.762 40.033 47.762 40.942 47.762 41.863Z" strokeLinejoin="round" />
        <path d="M36.713 45.557V33.214L47.762 28.096V40.033" strokeLinejoin="round" />
    </svg>
);

export const LoxoneTreeIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 68 69" className={className} fill="none">
        <path d="M33.666,66.063 C51.845,66.063 66.581,51.326 66.581,33.147 C66.581,14.968 51.845,0.232 33.666,0.232 C15.487,0.232 0.75,14.968 0.75,33.147 C0.75,51.326 15.487,66.063 33.666,66.063 Z" stroke="currentColor" strokeWidth="1.5" />
        <line x1="33.666" y1="66.384" x2="33.666" y2="13.305" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="33.666" cy="13.305" r="2.834" fill="currentColor" />
        <circle cx="22.327" cy="35.982" r="2.835" fill="currentColor" />
        <circle cx="25.162" cy="24.643" r="2.835" fill="currentColor" />
        <circle cx="42.17" cy="21.845" r="2.835" fill="currentColor" />
        <circle cx="48.803" cy="38.76" r="2.835" fill="currentColor" />
        <circle cx="19.804" cy="47.32" r="2.835" fill="currentColor" />
        <circle cx="42.142" cy="34.565" r="2.835" fill="currentColor" />
        <g transform="translate(19, 22)" stroke="currentColor" strokeWidth="2.2">
            <path d="M14.843,16.401 L5.916,2.655 M14.843,31.639 L3.362,13.96 M14.488,40.386 L30.146,16.275 M14.647,13.383 L23.28,0.09 M23.142,11.147 L23.142,27.191 M10.98,25.32 L0.493,25.32" />
        </g>
    </svg>
);

export const LoxoneLightingIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 52 53" className={className} fill="none" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.32 26.647V49.527H33.152" />
        <path d="M2.08 25.607L26 3.767L49.92 25.607" />
        <path d="M34.32 5.847H41.6V13.127" />
        <path d="M29.12 14.167H22.88V20.407H29.12V14.167Z" />
        <path d="M45.92 38.527C45.92 35.213 43.232 32.527 39.92 32.527C36.606 32.527 33.92 35.213 33.92 38.527C33.92 41.321 35.833 43.663 38.42 44.33V45.527H41.42V44.33C44.005 43.663 45.92 41.321 45.92 38.527Z" />
        <path d="M40.42 49.527H39.42" />
        <path d="M41.42 47.527H38.42" />
        <path d="M39.92 28.527V30.527" />
        <path d="M49.92 38.527H47.92" />
        <path d="M29.92 38.527H31.92" />
        <path d="M32.141 30.749L34.263 32.871" />
        <path d="M47.697 30.749L45.575 32.871" />
    </svg>
);

export const LoxoneTemperatureIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 52 53" className={className} fill="none" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7.583 26.717V50.55H30.133" />
        <path d="M1.083 25.634L26 2.884L50.917 25.634" />
        <path d="M34.667 5.051H42.25V12.634" />
        <path d="M29.25 13.717H22.75V20.217H29.25V13.717Z" />
        <path d="M42.402 40.858V30.307C42.402 28.872 41.239 27.708 39.804 27.708C38.368 27.708 37.205 28.872 37.205 30.307V40.858C35.653 41.756 34.606 43.431 34.606 45.353C34.606 48.225 36.935 50.55 39.804 50.55C42.674 50.55 45.001 48.225 45.001 45.353C45.001 43.431 43.954 41.756 42.402 40.858Z" />
        <circle cx="39.804" cy="45.353" r="1.3" />
        <path d="M39.804 44.053V31.059" />
        <path d="M45.001 38.38H47.6" />
        <path d="M45.001 34.669H47.6" />
        <path d="M45.001 31.059H47.6" />
    </svg>
);

export const LoxoneVentilationIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 52 53" className={className} fill="none" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.32 26.015V48.895H34.252" />
        <path d="M2.08 24.975L26 3.135L49.92 24.975" />
        <path d="M34.32 5.215H41.6V12.495" />
        <path d="M29.12 13.535H22.88V19.775H29.12V13.535Z" />
        <path d="M41.636 37.58C39.72 38.857 38.734 41.19 41.636 43.148C43.227 47.126 46.186 46.055 47.938 44.21C49.69 42.364 50.606 37.215 49.311 34.398C46.514 36.506 44.022 35.989 41.636 37.58Z" />
        <path d="M36.099 31.965C38.159 34.39 39.249 37.58 34.338 39.721C32.09 44.739 28.671 42.881 26.395 40.202C24.12 37.521 23.252 30.35 25.255 26.562C28.947 29.688 33.526 28.931 36.099 31.965Z" />
        <path d="M45.613 39.966C40.84 42.353 38.454 48.717 38.454 48.717C38.454 48.717 36.443 39.393 28.488 32.234" />
    </svg>
);

export const LoxoneEnergyIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 52 52" className={className} fill="none" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.32 26V48.88H33.262" />
        <path d="M2.08 24.96L26 3.12L49.92 24.96" />
        <path d="M34.32 5.2H41.6V12.48" />
        <path d="M29.12 13.52H22.88V19.76H29.12V13.52Z" />
        <path d="M35.36 24.96V26" />
        <path d="M28.08 27.042L29.12 28.082" />
        <path d="M42.64 27.04L41.6 28.08" />
        <path d="M26 34.32H27.04" />
        <path d="M40.025 30.184C38.882 28.895 37.217 28.08 35.36 28.08C31.914 28.08 29.12 30.875 29.12 34.32C29.12 35.035 29.243 35.718 29.467 36.357" />
        <path d="M33.28 34.32H44.72L49.92 43.68H28.08L33.28 34.32Z" />
        <path d="M40.56 43.68H37.44V48.88H40.56V43.68Z" />
        <path d="M36.92 34.32L34.84 43.68" />
        <path d="M41.08 34.32L43.16 43.68" />
        <path d="M31.546 37.44H46.454" strokeLinejoin="round" />
        <path d="M29.814 40.56H48.186" strokeLinejoin="round" />
    </svg>
);
