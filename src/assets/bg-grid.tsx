import * as React from 'react';

export function BgGrid(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      width={970}
      height={682}
      viewBox="0 0 970 682"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={-238}
        y={0}
        width={1208}
        height={682}
      >
        <g
          opacity={0.1}
          clipPath="url(#clip0_6_1204)"
          stroke="#727272"
          strokeDasharray="6 6"
        >
          <path d="M953.882 681.353V.089M912.322 681.353V.089M870.762 681.353V.089M829.203 681.353V.089M787.644 681.353V.089M746.075 681.353V.089M704.516 681.353V.089M662.956 681.353V.089M621.396 681.353V.089M579.833 681.353V.089M538.273 681.353V.089M496.713 681.353V.089M455.149 681.353V.089M413.583 681.353V.089M372.003 681.363V.099M330.442 681.363V.099M288.879 681.363V.099M247.319 681.363V.099M205.758 681.363V.099M164.195 681.363V.099M122.635 681.363V.099M81.07 681.363V.099M39.512 681.363V.099M-237.675 651.841H1066.52M-237.675 610.3H1066.52M-237.675 568.759H1066.52M-237.675 527.218l1304.195.001M-237.675 485.678H1066.52M-237.675 444.138H1066.52M-237.675 402.595l1304.195.001M-237.675 361.055H1066.52M-237.675 319.516H1066.52M-237.675 277.974l1304.195.001M-237.675 236.434H1066.52M-237.675 194.895H1066.52M-237.675 153.354l1304.195.001M-237.675 111.813H1066.52M-237.675 70.272H1066.52M-237.675 28.733H1066.52" />
        </g>
      </mask>
      <g mask="url(#a)">
        <ellipse
          cx={323.379}
          cy={337.923}
          rx={521.194}
          ry={308.698}
          fill="url(#paint0_radial_6_1204)"
        />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_6_1204"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 399.077 -673.786 0 323.379 337.923)"
        >
          <stop stopColor="#D9D9D9" />
          <stop offset={1} stopColor="#D9D9D9" stopOpacity={0} />
        </radialGradient>
        <clipPath id="clip0_6_1204">
          <path fill="#fff" transform="translate(-238)" d="M0 0H1208V681.935H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
