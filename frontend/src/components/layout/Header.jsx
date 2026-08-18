import { useEffect, useRef, useState } from "react";

import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../../services/notificationService";


function Header() {

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(false);

  const notificationRef = useRef(null);


  // =====================================================
  // LOAD NOTIFICATIONS
  // =====================================================

  const loadNotifications = async () => {

    try {

      const data = await getNotifications();

      setNotifications(data);

      const count = await getUnreadNotificationCount();

      setUnreadCount(count);

    } catch (error) {

      console.error(
        "Error loading notifications:",
        error
      );

    }
  };


  // =====================================================
  // INITIAL LOAD + AUTO REFRESH
  // =====================================================

  useEffect(() => {

    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 30000);

    return () => clearInterval(interval);

  }, []);


  // =====================================================
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // =====================================================

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);


  // =====================================================
  // MARK ONE NOTIFICATION AS READ
  // =====================================================

  const handleNotificationClick = async (
    notification
  ) => {

    if (!notification.is_read) {

      try {

        await markNotificationAsRead(
          notification.id
        );

        setNotifications((previous) =>
          previous.map((item) =>
            item.id === notification.id
              ? {
                  ...item,
                  is_read: true
                }
              : item
          )
        );

        setUnreadCount((previous) =>
          Math.max(previous - 1, 0)
        );

      } catch (error) {

        console.error(
          "Error marking notification as read:",
          error
        );

      }

    }

  };


  // =====================================================
  // MARK ALL AS READ
  // =====================================================

  const handleMarkAllAsRead = async () => {

    if (unreadCount === 0) {
      return;
    }

    try {

      setLoading(true);

      await markAllNotificationsAsRead();

      setNotifications((previous) =>
        previous.map((item) => ({
          ...item,
          is_read: true
        }))
      );

      setUnreadCount(0);

    } catch (error) {

      console.error(
        "Error marking all notifications as read:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // NOTIFICATION ICON
  // =====================================================

  const getNotificationIcon = (type) => {

    switch (type) {

      case "inventory":
        return "📦";

      case "prediction":
        return "🤖";

      case "recommendation":
        return "♻️";

      case "sustainability":
        return "🌱";

      case "circularity":
        return "🔄";

      case "report":
        return "📄";

      default:
        return "🔔";
    }

  };


  return (

    <div className="bg-white shadow-sm p-5 rounded-xl mb-6">

      <div className="flex items-center justify-between">

        {/* =================================================
            DASHBOARD HEADER
        ================================================= */}

        <div>

          <h2 className="text-2xl font-bold">
            Dashboard
          </h2>

          <p className="text-gray-500">
            Welcome to the Textile Waste Management AI System
          </p>

        </div>


        {/* =================================================
            NOTIFICATION BELL
        ================================================= */}

        <div
          className="relative"
          ref={notificationRef}
        >

          <button
            type="button"
            onClick={() =>
              setShowNotifications(
                (previous) => !previous
              )
            }
            className="relative w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-2xl transition"
            title="Notifications"
          >

            🔔

            {/* Unread Badge */}

            {unreadCount > 0 && (

              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold min-w-[22px] h-[22px] px-1 rounded-full flex items-center justify-center">

                {unreadCount > 99
                  ? "99+"
                  : unreadCount}

              </span>

            )}

          </button>


          {/* =================================================
              NOTIFICATION DROPDOWN
          ================================================= */}

          {showNotifications && (

            <div className="absolute right-0 top-14 w-[420px] max-w-[90vw] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">


              {/* Header */}

              <div className="flex items-center justify-between px-5 py-4 border-b">

                <div>

                  <h3 className="text-lg font-bold">
                    Notifications
                  </h3>

                  <p className="text-sm text-gray-500">

                    {unreadCount === 0
                      ? "You're all caught up"
                      : `${unreadCount} unread notification${
                          unreadCount > 1
                            ? "s"
                            : ""
                        }`}

                  </p>

                </div>


                {unreadCount > 0 && (

                  <button
                    type="button"
                    onClick={handleMarkAllAsRead}
                    disabled={loading}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50"
                  >

                    {loading
                      ? "Updating..."
                      : "Mark all as read"}

                  </button>

                )}

              </div>


              {/* Notification List */}

              <div className="max-h-[420px] overflow-y-auto">

                {notifications.length === 0 ? (

                  <div className="p-8 text-center">

                    <div className="text-4xl mb-3">
                      🔔
                    </div>

                    <p className="font-medium text-gray-700">
                      No notifications
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      New activity will appear here.
                    </p>

                  </div>

                ) : (

                  notifications.map((notification) => (

                    <button
                      type="button"
                      key={notification.id}
                      onClick={() =>
                        handleNotificationClick(
                          notification
                        )
                      }
                      className={`w-full text-left px-5 py-4 border-b hover:bg-gray-50 transition ${
                        !notification.is_read
                          ? "bg-blue-50"
                          : "bg-white"
                      }`}
                    >

                      <div className="flex gap-3">

                        {/* Icon */}

                        <div className="text-2xl flex-shrink-0">

                          {getNotificationIcon(
                            notification.notification_type
                          )}

                        </div>


                        {/* Content */}

                        <div className="flex-1 min-w-0">

                          <div className="flex items-start justify-between gap-2">

                            <p className="font-semibold text-gray-800">

                              {notification.title}

                            </p>


                            {!notification.is_read && (

                              <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />

                            )}

                          </div>


                          <p className="text-sm text-gray-600 mt-1">

                            {notification.message}

                          </p>


                          <p className="text-xs text-gray-400 mt-2">

                            {notification.created_at}

                          </p>

                        </div>

                      </div>

                    </button>

                  ))

                )}

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}


export default Header;