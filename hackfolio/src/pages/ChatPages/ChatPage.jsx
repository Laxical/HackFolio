import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChatComponent from "../../components/ChatComponents/ChatComponent";
import NotificationsComponent from "../../components/ChatComponents/NotificationsComponent";
import Header from "../../components/Header";
import ReactingNavBar from "../../components/ReactingNavBar";
import { motion } from "framer-motion";
import gsap from "gsap";
// import "../../styles/ChatPage.css";

const ChatPage = (props) => {
  const location = useLocation();
  const token = localStorage.getItem("data");
  const storedToken = token ? JSON.parse(token).email : null;
  const initialUser = location.state?.currUser || storedToken;
  const [currUser, setCurrUser] = useState(initialUser);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    // GSAP animation for smooth transitions
    gsap.fromTo(
      ".chat-section",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: ".chat-section",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="flex h-[1000px] relative">
      <ReactingNavBar />
      <motion.div
            className="fixed right-[200px] bottom-12 h-24 w-24 rounded-xl bg-blue-300"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.div
            className="fixed right-[200px] bottom-[130px] h-32 w-48 rounded-full bg-yellow-400"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        />
        <motion.div
            className="fixed bottom-12 right-[1000px] h-24 w-24 rounded-full bg-purple-400"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        />

<       motion.div
            className="fixed bottom-[600px] right-[1000px] h-24 w-24 rounded-full bg-purple-400"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        />
      <div className="flex-1 flex flex-col">
        {!props.flag && <Header />}
        <main className="flex-1 p-6 overflow-hidden">
          <motion.div
            className="chat-section rounded-3xl p-6 h-full flex flex-col relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Shapes */}
            <motion.div
              className="absolute bg-indigo-400 rounded-full w-40 h-40 opacity-10"
              style={{ top: "10%", left: "10%" }}
              animate={{
                y: [0, 20, 0],
                rotate: [0, 360],
                transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <motion.div
              className="absolute bg-[#c084fc] rounded-full w-32 h-32 opacity-10"
              style={{ top: "30%", right: "20%" }}
              animate={{
                y: [0, 20, 0],
                rotate: [0, -360],
                transition: { duration: 12, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <motion.div
              className="absolute bg-indigo-400 w-20 h-20 opacity-10"
              style={{ top: "50%", left: "25%" }}
              animate={{
                y: [0, 15, 0],
                rotate: [0, 180],
                transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <motion.div
              className="absolute bg-[#a5b4fc] w-24 h-24 opacity-10"
              style={{ bottom: "30%", right: "15%" }}
              animate={{
                y: [0, 25, 0],
                rotate: [0, 90],
                transition: { duration: 14, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            {/* Chat and Notifications */}
            <div className="flex-1 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 overflow-hidden z-10">
              <div className="flex-grow lg:w-3/4 h-[calc(100vh-200px)] lg:h-auto">
                <ChatComponent
                  currUser={currUser}
                  setCurrUser={setCurrUser}
                  setFlag={setFlag}
                  flag={flag}
                />
              </div>
              <div className="lg:w-1/4 h-[calc(100vh-200px)] lg:h-auto overflow-y-auto">
                <NotificationsComponent
                  flag={flag}
                  currUser={currUser}
                  setCurrUser={setCurrUser}
                />
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;