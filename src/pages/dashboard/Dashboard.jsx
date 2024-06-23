// import "./dashboard.scss";

// const AlertButton = ({ onSmash, children }) => {
//   return (
//     <button
//       onClick={(e) => {
//         e.stopPropagation();
//         onSmash();
//       }}
//     >
//       {children}
//     </button>
//   );
// };

// function Dashboard() {
//   return (
//     <section 
//       className="dashboard"
//       onPaste={() => console.log('onPaste')}
//     >
//       <input type="text" onCopy={e => console.log(e.clipboardData)} />
//       <AlertButton
//         onSmash={() => {
//           alert("Listening");
//         }}
//       >
//         Listening
//       </AlertButton>
//       <AlertButton
//         onSmash={() => {
//           alert("Listening");
//         }}
//       >
//         Listening
//       </AlertButton>
//     </section>
//   );
// }

// export default Dashboard;
