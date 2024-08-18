import "./App.css";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import headshot from "./assets/headshot.jpg";
import weddingImage from "./assets/wedding.jpg";

function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShowSecAvatar, setIsShowSecAvatar] = useState(false);

  const conversation = [
    {
      id: 1,
      from: "left",
      text: "親愛的，翔宇和羽涵要結婚了！",
      avatar: headshot,
    },
    {
      id: 2,
      from: "right",
      text: "恭喜！真替你們開心！什麼時候？婚禮打算辦在哪裡呢？",
    },
    {
      id: 3,
      from: "left",
      text: "9/15星期天，辦在台北大直典華",
      avatar: headshot,
      children: (
        <div className="iframe-container mt-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.5347932162254!2d121.55222587555458!3d25.08375203628609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ac123aa95643%3A0x14abdff6d45ddd5e!2z5YW46I-v5bm456aP5aSn5qiTKOWkp-ebtOW6lyk!5e0!3m2!1szh-TW!2stw!4v1723825436820!5m2!1szh-TW!2stw"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      ),
    },
    {
      id: 4,
      from: "right",
      text: "太棒了，我想聽聽你們的故事❤️",
    },
    {
      id: 5,
      from: "left",
      avatar: headshot,
      text: "我們從國中同學一路走來，愛情長跑11年，如今不僅是伴侶，更是家人，是彼此攜手共度一生的人，我們誠摯邀請您在9月15日，一同見證我們的愛情，分享我們的幸福時刻！",
      children: <img className="rounded" src={weddingImage} alt="wedding" />,
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sleep = (ms) => {
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve(true), ms),
    );
  };

  const MainAvatar = () => (
    <div
      id="main-avatar"
      className="flex items-center justify-center p-8 flex-col"
    >
      <div className="h-20 w-20 relative">
        <div className="absolute rounded-full bg-green-500 w-4 h-4 right-2 bottom-0 border-2 border-gray-800" />
        <img
          src={headshot}
          alt="headshot"
          className="w-full h-full  rounded-full"
        />
      </div>
      <div className="text-white pt-2">翔宇 & 羽涵</div>
      <div className="text-white text-xs ">2024年9月15日上午11:50</div>
    </div>
  );

  const MessageList = ({ messages, isTyping }) => (
    <div className="w-full max-w-md md:max-w-none bg-gray-800 p-4  rounded">
      <div className="space-y-4">
        {messages.map((message) => (
          <Message message={message} key={message.id} />
        ))}
        {isTyping && messages.length !== 5 && (
          <div
            className={`flex items-start ${
              messages[messages.length - 1].from === "left"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            {messages[messages.length - 1].from === "right" && (
              <img
                src={messages[messages.length - 2].avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full mr-2 text-white"
              />
            )}
            <div
              className={`${
                messages[messages.length - 1].from === "right"
                  ? "bg-gray-600"
                  : "bg-blue-600"
              } text-white p-2 rounded-lg max-w-xs`}
            >
              <div className="typing-indicator">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const Message = ({ message }) => (
    <div
      key={message.id}
      className={`flex items-start ${
        message.from === "left" ? "justify-start" : "justify-end"
      }`}
    >
      {message.from === "left" && (
        <img
          src={message.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full mr-2 text-white"
        />
      )}
      <div
        className={`${
          message.from === "left" ? "bg-gray-600" : "bg-blue-600"
        } text-white p-2 rounded-lg max-w-xs w-9/12`}
      >
        {message.text}
        {message?.children}
      </div>
      {message.from === "right" && (
        <div className="w-10 h-10 rounded-full ml-2 text-white">You</div>
      )}
    </div>
  );

  const ScrollToTopButton = ({ scrollToTop }) => (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={scrollToTop}
        className="bg-gray-300 text-white px-3 py-2  rounded-full shadow-lg"
      >
        ↑
      </button>
    </div>
  );

  const SecondaryAvatar = () => (
    <div
      className="opacity-95 fixed top-0 left-0 right-0 flex flex-col items-center justify-center p-2 bg-gray-900 shadow-lg z-50 transition-transform duration-300"
      style={{ transform: "translateY(0)" }}
    >
      <div className="h-12 w-12 relative">
        <div className="absolute rounded-full bg-green-500 w-3 h-3 right-1 bottom-0 border-2 border-gray-900" />
        <img
          src={headshot}
          alt="small-headshot"
          className="w-full h-full rounded-full"
        />
      </div>
      <div className="text-white ">翔宇 & 羽涵</div>
    </div>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < conversation.length) {
        setMessages((prev) => [...prev, conversation[currentIndex]]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        sleep(1000).then((res) => {
          if (res) {
            setIsTyping(true);
          }
        });
      } else {
        clearInterval(interval);
        confetti({
          particleCount: 150,
          spread: 60,
          origin: { y: 0.6 },
        });
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 120,
            origin: { y: 0.4 },
          });
        }, 500);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, conversation]);

  useEffect(() => {
    const handleScroll = () => {
      const mainAvatar = document.getElementById("main-avatar");
      const avatarRect = mainAvatar.getBoundingClientRect();

      if (avatarRect.bottom < 0) {
        setIsShowSecAvatar(true);
      } else {
        setIsShowSecAvatar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-800 min-h-screen relative">
      <MainAvatar />
      <MessageList messages={messages} isTyping={isTyping} />
      {messages.length === 5 && <ScrollToTopButton scrollToTop={scrollToTop} />}

      {isShowSecAvatar && <SecondaryAvatar />}
    </div>
  );
}

export default App;
