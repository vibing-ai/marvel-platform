'use client';

import React from 'react';

import { Avatar, Button, Grid, Typography } from '@mui/material';
// import { signOut } from "firebase/auth";
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';

import LogoutIcon from '@/assets/svg/LogoutIcon.svg';

import { styles } from './styles';

import { auth } from '@/libs/redux/store';

const TopBar = () => {
  const user = useSelector((state) => state.user.data);

  const handleSignOutUser = () => {
    signOut(auth);
  };

  const renderProfile = () => {
    return (
      <Grid style={styles.topBar.user.profile}>
        <Grid style={styles.topBar.user.userContainer}>
          <Avatar
            src={user?.profilePhotoUrl}
            style={styles.topBar.user.userProfile}
          >
            {user?.fullName?.[0]}
          </Avatar>
          {/* <Typography style={styles.topBar.user.userName}>{user?.fullName}</Typography> */}
        </Grid>
        <Button
          startIcon={<LogoutIcon />}
          onClick={handleSignOutUser}
          style={styles.topBar.user.logoutButton}
        />
      </Grid>
    );
  };

  return (
    <header style={styles.topBar.container}>
      <div style={styles.topBar.toolName}>
        <div style={styles.topBar.menu}>
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<svg id="1:4352" layer-name="KAI Avatar" width="124" height="112" viewBox="0 0 124 112" fill="none" xmlns="http://www.w3.org/2000/svg" class="kai-avatar" style="width: 64px; height: 64px; border-radius: 60px; background: #2C3039; box-shadow: 0 4px 30px rgba(0,0,0,0.25)"> <g filter="url(#filter0_d_1_4352)"> <rect x="30" y="24" width="64" height="64" rx="32" fill="#2C3039" shape-rendering="crispEdges"></rect> <path d="M61.8906 71.9937C57.5885 71.9937 53.2864 72.0103 48.9843 71.9895C44.27 71.9673 44.028 71.7495 44.0154 67.2469C43.9943 59.632 44.028 52.0171 44.0013 44.4008C43.9942 42.5887 43.9464 40.5767 46.2255 40.3075C48.7353 40.0106 51.6488 39.2322 53.2315 42.3486C55.1561 46.1394 57.0314 49.9538 58.9953 53.7238C59.6284 54.9393 60.1335 56.4059 62.006 56.313C63.7434 56.2269 64.4201 54.9754 65.07 53.6974C66.9482 50.0065 68.9065 46.3517 70.6439 42.597C72.1535 39.3349 74.9643 40.0314 77.4924 40.2853C79.967 40.5337 80.0078 42.5651 79.9994 44.5174C79.9656 52.2405 79.9938 59.965 79.9783 67.6881C79.9712 71.3485 79.3016 71.9715 75.4581 71.9784C70.9351 71.9868 66.4136 71.9812 61.8906 71.9812V71.9923V71.9937Z" fill="url(#paint0_linear_1_4352)"></path> </g> <defs> <filter id="filter0_d_1_4352" x="0" y="-2" width="124" height="124" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix> <feOffset dy="4"></feOffset> <feGaussianBlur stdDeviation="15"></feGaussianBlur> <feComposite in2="hardAlpha" operator="out"></feComposite> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_4352"></feBlend> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_4352" result="shape"></feBlend> </filter> <linearGradient id="paint0_linear_1_4352" x1="43.2247" y1="59.3434" x2="307.282" y2="11.9208" gradientUnits="userSpaceOnUse"> <stop stop-color="#AE3FFF"></stop> <stop offset="0.04" stop-color="#B53DEC"></stop> <stop offset="0.12" stop-color="#C838BC"></stop> <stop offset="0.23" stop-color="#E53070"></stop> <stop offset="0.31" stop-color="#FF2A30"></stop> <stop offset="0.37" stop-color="#D73158"></stop> <stop offset="0.51" stop-color="#7344BD"></stop> <stop offset="0.59" stop-color="#3351FF"></stop> <stop offset="1" stop-color="#9186EA"></stop> </linearGradient> </defs> </svg>',
            }}
          />
        </div>
        <div style={styles.topBar.header}>
          <h1 style={styles.topBar.title}>Presentation Generator</h1>
        </div>
      </div>
      <div style={styles.topBar.tools}>
        <div style={styles.topBar.notifications}>
          <div style={styles.topBar.notificationWrapper}>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  '<svg id="1:4360" layer-name="bell-notification/solid" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" class="bell-icon" style="width: 32px; height: 32px"> <path d="M25.4583 23.1667V16.2334C24.7917 16.3667 24.125 16.5001 23.4583 16.5001H22.7917V24.5001H9.45833V15.1667C9.45833 11.4334 12.3917 8.50008 16.125 8.50008C16.2583 6.76675 17.0583 5.30008 18.125 4.10008C17.725 3.56675 16.925 3.16675 16.125 3.16675C14.6583 3.16675 13.4583 4.36675 13.4583 5.83341V6.23342C9.45833 7.43342 6.79167 11.0334 6.79167 15.1667V23.1667L4.125 25.8334V27.1667H28.125V25.8334L25.4583 23.1667ZM13.4583 28.5001C13.4583 29.9667 14.6583 31.1667 16.125 31.1667C17.5917 31.1667 18.7917 29.9667 18.7917 28.5001H13.4583ZM28.125 9.16675C28.125 11.7001 25.9917 13.8334 23.4583 13.8334C20.925 13.8334 18.7917 11.7001 18.7917 9.16675C18.7917 6.63341 20.925 4.50008 23.4583 4.50008C25.9917 4.50008 28.125 6.63341 28.125 9.16675Z" fill="white"></path> </svg>',
              }}
            />
            <div style={styles.topBar.notificationCount}>
              <span style={styles.topBar.count}>3</span>
            </div>
          </div>
        </div>
        {renderProfile()}
      </div>
    </header>
  );
};

export default TopBar;

// "use client";
// import React from "react";
// import { styles } from "./styles";
// // import renderProfile from ""
// import { useSelector } from "react-redux";
// import { Avatar, Button, Grid, Typography } from '@mui/material';
// import { signOut } from 'firebase/auth';
// import { auth } from '@/libs/redux/store';
// import LogoutIcon from '@/assets/svg/LogoutIcon.svg';

// const TopBar = () => {

//     const user = useSelector((state) => state.user.data);

//     const handleSignOutUser = () => {
//         signOut(auth);
//       };

//     const renderProfile = () => {
//         return (
//           <Grid {...styles.profile}>
//             <Grid {...styles.userContainer}>
//               <Avatar src={user?.profilePhotoUrl} {...styles.userProfile}>
//                 {user?.fullName[0]}
//               </Avatar>
//               {/* <Typography {...styles.userName}>{user?.fullName}</Typography> */}
//             </Grid>
//             <Button startIcon={<LogoutIcon />} onClick={handleSignOutUser} />
//           </Grid>
//         );
//       };

//   return (
//     <header style={styles.topBar.container}>
//       <div style={styles.topBar.toolName}>
//         <div style={styles.topBar.menu}>
//           <div
//             dangerouslySetInnerHTML={{
//               __html: `<svg id="1:4352" layer-name="KAI Avatar" width="124" height="112" viewBox="0 0 124 112" fill="none" xmlns="http://www.w3.org/2000/svg" class="kai-avatar" style="width: 64px; height: 64px; border-radius: 60px; background: #2C3039; box-shadow: 0 4px 30px rgba(0,0,0,0.25)"> <g filter="url(#filter0_d_1_4352)"> <rect x="30" y="24" width="64" height="64" rx="32" fill="#2C3039" shape-rendering="crispEdges"></rect> <path d="M61.8906 71.9937C57.5885 71.9937 53.2864 72.0103 48.9843 71.9895C44.27 71.9673 44.028 71.7495 44.0154 67.2469C43.9943 59.632 44.028 52.0171 44.0013 44.4008C43.9942 42.5887 43.9464 40.5767 46.2255 40.3075C48.7353 40.0106 51.6488 39.2322 53.2315 42.3486C55.1561 46.1394 57.0314 49.9538 58.9953 53.7238C59.6284 54.9393 60.1335 56.4059 62.006 56.313C63.7434 56.2269 64.4201 54.9754 65.07 53.6974C66.9482 50.0065 68.9065 46.3517 70.6439 42.597C72.1535 39.3349 74.9643 40.0314 77.4924 40.2853C79.967 40.5337 80.0078 42.5651 79.9994 44.5174C79.9656 52.2405 79.9938 59.965 79.9783 67.6881C79.9712 71.3485 79.3016 71.9715 75.4581 71.9784C70.9351 71.9868 66.4136 71.9812 61.8906 71.9812V71.9923V71.9937Z" fill="url(#paint0_linear_1_4352)"></path> </g> <defs> <filter id="filter0_d_1_4352" x="0" y="-2" width="124" height="124" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix> <feOffset dy="4"></feOffset> <feGaussianBlur stdDeviation="15"></feGaussianBlur> <feComposite in2="hardAlpha" operator="out"></feComposite> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_4352"></feBlend> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_4352" result="shape"></feBlend> </filter> <linearGradient id="paint0_linear_1_4352" x1="43.2247" y1="59.3434" x2="307.282" y2="11.9208" gradientUnits="userSpaceOnUse"> <stop stop-color="#AE3FFF"></stop> <stop offset="0.04" stop-color="#B53DEC"></stop> <stop offset="0.12" stop-color="#C838BC"></stop> <stop offset="0.23" stop-color="#E53070"></stop> <stop offset="0.31" stop-color="#FF2A30"></stop> <stop offset="0.37" stop-color="#D73158"></stop> <stop offset="0.51" stop-color="#7344BD"></stop> <stop offset="0.59" stop-color="#3351FF"></stop> <stop offset="1" stop-color="#9186EA"></stop> </linearGradient> </defs> </svg>`,
//             }}
//           />
//         </div>
//         <div style={styles.topBar.header}>
//           <h1 style={styles.topBar.title}>Presentation Generator</h1>
//         </div>
//       </div>
//       <div style={styles.topBar.tools}>
//         <div style={styles.topBar.notifications}>
//           <div style={styles.topBar.notificationWrapper}>
//             <div
//               dangerouslySetInnerHTML={{
//                 __html: `<svg id="1:4360" layer-name="bell-notification/solid" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" class="bell-icon" style="width: 32px; height: 32px"> <path d="M25.4583 23.1667V16.2334C24.7917 16.3667 24.125 16.5001 23.4583 16.5001H22.7917V24.5001H9.45833V15.1667C9.45833 11.4334 12.3917 8.50008 16.125 8.50008C16.2583 6.76675 17.0583 5.30008 18.125 4.10008C17.725 3.56675 16.925 3.16675 16.125 3.16675C14.6583 3.16675 13.4583 4.36675 13.4583 5.83341V6.23342C9.45833 7.43342 6.79167 11.0334 6.79167 15.1667V23.1667L4.125 25.8334V27.1667H28.125V25.8334L25.4583 23.1667ZM13.4583 28.5001C13.4583 29.9667 14.6583 31.1667 16.125 31.1667C17.5917 31.1667 18.7917 29.9667 18.7917 28.5001H13.4583ZM28.125 9.16675C28.125 11.7001 25.9917 13.8334 23.4583 13.8334C20.925 13.8334 18.7917 11.7001 18.7917 9.16675C18.7917 6.63341 20.925 4.50008 23.4583 4.50008C25.9917 4.50008 28.125 6.63341 28.125 9.16675Z" fill="white"></path> </svg>`,
//               }}
//             />
//             <div style={styles.topBar.notificationCount}>
//               <span style={styles.topBar.count}>3</span>
//             </div>
//           </div>
//         </div>
//         <div style={styles.topBar.profilePhoto}>
//           <div
//             dangerouslySetInnerHTML={{
//               __html: `<svg id="1:4365" layer-name="Avatar" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="avatar" style="width: 48px; height: 48px"> <circle cx="24" cy="24" r="24" fill="url(#pattern0_1_4365)"></circle> <circle cx="42" cy="42" r="6" fill="#12D18E"></circle> <circle cx="42" cy="42" r="5.2" stroke="#181A20" stroke-opacity="0.85" stroke-width="1.6"></circle> <defs> <pattern id="pattern0_1_4365" patternContentUnits="objectBoundingBox" width="1" height="1"> <use xlink:href="#image0_1_4365" transform="scale(0.002)"></use> </pattern>  </defs> </svg>`,
//             }}
//           />
//           {/* {renderProfile()} */}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default TopBar;
