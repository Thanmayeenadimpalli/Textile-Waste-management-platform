import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

function Settings() {
    const [notificationsEnabled, setNotificationsEnabled] =
        useState(true);

    const [settings, setSettings] = useState({
        inventoryAlerts: true,
        recyclingOpportunities: true,
        sustainabilityMilestones: true,
        wasteCollectionAlerts: true,
        platformAnnouncements: true,
    });

    const handleToggle = (key) => {
        setSettings((previous) => ({
            ...previous,
            [key]: !previous[key],
        }));
    };

    const handleMasterToggle = () => {
        setNotificationsEnabled(
            (previous) => !previous
        );
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">

            {/* Sidebar */}

            <Sidebar />


            {/* Main Content */}

            <div className="ml-64 flex-1 p-6">

                <Header />


                <div className="mt-6">

                    <h1 className="text-3xl font-bold mb-2">
                        ⚙️ Settings
                    </h1>

                    <p className="text-gray-600 mb-6">
                        Manage your notification and alert preferences.
                    </p>


                    {/* =================================================
                        NOTIFICATION SETTINGS
                    ================================================= */}

                    <div className="bg-white rounded-xl shadow-md p-8">

                        <h2 className="text-2xl font-bold mb-2">
                            🔔 Notification Settings
                        </h2>

                        <p className="text-gray-500 mb-8">
                            Choose which notifications and alerts
                            you want to receive.
                        </p>


                        {/* =================================================
                            MASTER NOTIFICATION SWITCH
                        ================================================= */}

                        <div className="border-b pb-6 mb-6">

                            <div className="flex items-center justify-between">

                                <div>

                                    <h3 className="text-lg font-semibold">
                                        Enable Notifications
                                    </h3>

                                    <p className="text-gray-500 text-sm mt-1">
                                        Turn all system notifications
                                        on or off.
                                    </p>

                                </div>


                                <button
                                    onClick={handleMasterToggle}
                                    className={`relative inline-flex h-7 w-14 items-center rounded-full transition ${
                                        notificationsEnabled
                                            ? "bg-green-600"
                                            : "bg-gray-400"
                                    }`}
                                    aria-label="Enable Notifications"
                                >

                                    <span
                                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                                            notificationsEnabled
                                                ? "translate-x-8"
                                                : "translate-x-1"
                                        }`}
                                    />

                                </button>

                            </div>

                            <p
                                className={`mt-3 text-sm font-medium ${
                                    notificationsEnabled
                                        ? "text-green-600"
                                        : "text-gray-500"
                                }`}
                            >
                                {notificationsEnabled
                                    ? "Notifications are enabled"
                                    : "Notifications are disabled"}
                            </p>

                        </div>


                        {/* =================================================
                            INDIVIDUAL NOTIFICATIONS
                        ================================================= */}

                        <div className="space-y-6">

                            {/* Inventory Alerts */}

                            <NotificationSetting
                                title="📦 Inventory Alerts"
                                description="Receive alerts about inventory levels, damaged batches, and important inventory changes."
                                enabled={
                                    settings.inventoryAlerts
                                }
                                disabled={
                                    !notificationsEnabled
                                }
                                onToggle={() =>
                                    handleToggle(
                                        "inventoryAlerts"
                                    )
                                }
                            />


                            {/* Recycling Opportunities */}

                            <NotificationSetting
                                title="♻️ Recycling Opportunities"
                                description="Receive recommendations when textile materials have good reuse or recycling potential."
                                enabled={
                                    settings.recyclingOpportunities
                                }
                                disabled={
                                    !notificationsEnabled
                                }
                                onToggle={() =>
                                    handleToggle(
                                        "recyclingOpportunities"
                                    )
                                }
                            />


                            {/* Sustainability Milestones */}

                            <NotificationSetting
                                title="🌱 Sustainability Milestones"
                                description="Receive alerts when your textile recovery activities reach sustainability milestones."
                                enabled={
                                    settings.sustainabilityMilestones
                                }
                                disabled={
                                    !notificationsEnabled
                                }
                                onToggle={() =>
                                    handleToggle(
                                        "sustainabilityMilestones"
                                    )
                                }
                            />


                            {/* Waste Collection Alerts */}

                            <NotificationSetting
                                title="🚛 Waste Collection Alerts"
                                description="Receive notifications about textile waste collection and processing activities."
                                enabled={
                                    settings.wasteCollectionAlerts
                                }
                                disabled={
                                    !notificationsEnabled
                                }
                                onToggle={() =>
                                    handleToggle(
                                        "wasteCollectionAlerts"
                                    )
                                }
                            />


                            {/* Platform Announcements */}

                            <NotificationSetting
                                title="📢 Platform Announcements"
                                description="Receive important announcements and updates about the Textile Waste Management AI System."
                                enabled={
                                    settings.platformAnnouncements
                                }
                                disabled={
                                    !notificationsEnabled
                                }
                                onToggle={() =>
                                    handleToggle(
                                        "platformAnnouncements"
                                    )
                                }
                            />

                        </div>

                    </div>


                    {/* =================================================
                        INFORMATION CARD
                    ================================================= */}

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">

                        <h3 className="font-semibold text-blue-800 mb-2">
                            💡 About Notifications
                        </h3>

                        <p className="text-blue-700 text-sm">
                            Notifications help you stay informed about
                            textile predictions, recycling opportunities,
                            sustainability results, inventory activity,
                            and important platform updates.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}


/* =========================================================
   REUSABLE NOTIFICATION SETTING COMPONENT
========================================================= */

function NotificationSetting({
    title,
    description,
    enabled,
    disabled,
    onToggle,
}) {
    return (
        <div
            className={`flex items-center justify-between gap-6 p-4 rounded-lg border ${
                disabled
                    ? "bg-gray-100 opacity-60"
                    : "bg-white"
            }`}
        >

            <div className="flex-1">

                <h3 className="font-semibold text-lg">
                    {title}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                    {description}
                </p>

            </div>


            <button
                onClick={onToggle}
                disabled={disabled}
                className={`relative flex-shrink-0 inline-flex h-7 w-14 items-center rounded-full transition ${
                    enabled && !disabled
                        ? "bg-green-600"
                        : "bg-gray-400"
                } ${
                    disabled
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                }`}
                aria-label={title}
            >

                <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                        enabled && !disabled
                            ? "translate-x-8"
                            : "translate-x-1"
                    }`}
                />

            </button>

        </div>
    );
}


export default Settings;