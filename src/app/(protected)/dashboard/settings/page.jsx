'use client';

import React, { useState } from 'react';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    language: 'english',
    timezone: 'GMT+8',
    dateFormat: 'DD/MM/YYYY',
    theme: 'light',
    autoSave: true,

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    applicationAlerts: true,
    scholarshipUpdates: true,
    deadlineReminders: true,
    newsletter: false,
    marketingEmails: false,

    // Account Settings
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: '30',
    dataRetention: '12',

    // Application Settings
    autoAssignCounselor: true,
    requireDocumentVerification: true,
    scholarshipAutoMatch: true,
    applicationFeeWaiver: false,
    defaultCommissionRate: '15',

    // University Settings
    partnerNotifications: true,
    enrollmentReports: true,
    performanceMetrics: true,

    // System Settings
    maintenanceMode: false,
    backupFrequency: 'daily',
    apiAccess: false,
    debugMode: false,
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = () => {
    // Here you would typically make an API call to save settings
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  const handleResetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default settings
      setSettings({
        language: 'english',
        timezone: 'GMT+8',
        dateFormat: 'DD/MM/YYYY',
        theme: 'light',
        autoSave: true,
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        applicationAlerts: true,
        scholarshipUpdates: true,
        deadlineReminders: true,
        newsletter: false,
        marketingEmails: false,
        twoFactorAuth: false,
        loginAlerts: true,
        sessionTimeout: '30',
        dataRetention: '12',
        autoAssignCounselor: true,
        requireDocumentVerification: true,
        scholarshipAutoMatch: true,
        applicationFeeWaiver: false,
        defaultCommissionRate: '15',
        partnerNotifications: true,
        enrollmentReports: true,
        performanceMetrics: true,
        maintenanceMode: false,
        backupFrequency: 'daily',
        apiAccess: false,
        debugMode: false,
      });
    }
  };

  const sections = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'account', name: 'Account Security', icon: '🔒' },
    { id: 'applications', name: 'Application Settings', icon: '📋' },
    { id: 'universities', name: 'University Partners', icon: '🏛️' },
    { id: 'system', name: 'System', icon: '💻' },
  ];

  return (
    <div className="min-h-screen py-6">
      <div className=" py-4 ">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Settings
              </h1>
              <p className="text-gray-600">
                Manage your platform preferences and configurations
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleResetSettings}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition duration-200 flex items-center space-x-2"
              >
                <span>🔄</span>
                <span>Reset to Default</span>
              </button>
              <button
                onClick={handleSaveSettings}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
              >
                <span>💾</span>
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-6">
              <nav className="space-y-2">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span>{section.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* General Settings */}
            {activeSection === 'general' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    General Preferences
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={settings.language}
                        onChange={e =>
                          handleSettingChange('language', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="english">English</option>
                        <option value="malay">Malay</option>
                        <option value="chinese">Chinese</option>
                        <option value="indonesian">Indonesian</option>
                        <option value="vietnamese">Vietnamese</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        value={settings.timezone}
                        onChange={e =>
                          handleSettingChange('timezone', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="GMT+8">
                          GMT+8 (Malaysia, Singapore, China)
                        </option>
                        <option value="GMT+7">
                          GMT+7 (Thailand, Vietnam, Indonesia)
                        </option>
                        <option value="GMT+9">GMT+9 (Japan, Korea)</option>
                        <option value="GMT+5.5">GMT+5.5 (India)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Format
                      </label>
                      <select
                        value={settings.dateFormat}
                        onChange={e =>
                          handleSettingChange('dateFormat', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Theme
                      </label>
                      <select
                        value={settings.theme}
                        onChange={e =>
                          handleSettingChange('theme', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto (System)</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Auto-save Changes
                        </p>
                        <p className="text-sm text-gray-500">
                          Automatically save changes as you work
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleSettingChange('autoSave', !settings.autoSave)
                        }
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          settings.autoSave ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            settings.autoSave
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Notification Channels
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        key: 'emailNotifications',
                        label: 'Email Notifications',
                        description: 'Receive notifications via email',
                      },
                      {
                        key: 'smsNotifications',
                        label: 'SMS Notifications',
                        description: 'Receive notifications via SMS',
                      },
                      {
                        key: 'pushNotifications',
                        label: 'Push Notifications',
                        description: 'Receive browser push notifications',
                      },
                    ].map(item => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.label}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleSettingChange(item.key, !settings[item.key])
                          }
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            settings[item.key] ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              settings[item.key]
                                ? 'translate-x-5'
                                : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Notification Types
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        key: 'applicationAlerts',
                        label: 'Application Alerts',
                        description:
                          'Get notified about new applications and status changes',
                      },
                      {
                        key: 'scholarshipUpdates',
                        label: 'Scholarship Updates',
                        description:
                          'Receive updates about scholarship opportunities',
                      },
                      {
                        key: 'deadlineReminders',
                        label: 'Deadline Reminders',
                        description: 'Get reminders for upcoming deadlines',
                      },
                      {
                        key: 'newsletter',
                        label: 'Monthly Newsletter',
                        description:
                          'Receive our monthly newsletter with updates',
                      },
                      {
                        key: 'marketingEmails',
                        label: 'Marketing Emails',
                        description: 'Receive promotional emails and offers',
                      },
                    ].map(item => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.label}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleSettingChange(item.key, !settings[item.key])
                          }
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            settings[item.key] ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              settings[item.key]
                                ? 'translate-x-5'
                                : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Account Security Settings */}
            {activeSection === 'account' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Security Settings
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Two-Factor Authentication
                        </p>
                        <p className="text-sm text-gray-500">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleSettingChange(
                            'twoFactorAuth',
                            !settings.twoFactorAuth
                          )
                        }
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          settings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            settings.twoFactorAuth
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Login Alerts
                        </p>
                        <p className="text-sm text-gray-500">
                          Get notified when someone logs into your account
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleSettingChange(
                            'loginAlerts',
                            !settings.loginAlerts
                          )
                        }
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          settings.loginAlerts ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            settings.loginAlerts
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Session Timeout (minutes)
                      </label>
                      <select
                        value={settings.sessionTimeout}
                        onChange={e =>
                          handleSettingChange('sessionTimeout', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data Retention Period (months)
                      </label>
                      <select
                        value={settings.dataRetention}
                        onChange={e =>
                          handleSettingChange('dataRetention', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="6">6 months</option>
                        <option value="12">12 months</option>
                        <option value="24">24 months</option>
                        <option value="36">36 months</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Application Settings */}
            {activeSection === 'applications' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Application Management
                  </h3>
                  <div className="space-y-6">
                    {[
                      {
                        key: 'autoAssignCounselor',
                        label: 'Auto-assign Counselor',
                        description:
                          'Automatically assign students to available counselors',
                      },
                      {
                        key: 'requireDocumentVerification',
                        label: 'Document Verification',
                        description:
                          'Require document verification before processing',
                      },
                      {
                        key: 'scholarshipAutoMatch',
                        label: 'Scholarship Auto-match',
                        description:
                          'Automatically match students with suitable scholarships',
                      },
                      {
                        key: 'applicationFeeWaiver',
                        label: 'Fee Waiver Program',
                        description:
                          'Enable application fee waiver for eligible students',
                      },
                    ].map(item => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.label}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleSettingChange(item.key, !settings[item.key])
                          }
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            settings[item.key] ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              settings[item.key]
                                ? 'translate-x-5'
                                : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    ))}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Commission Rate (%)
                      </label>
                      <input
                        type="number"
                        value={settings.defaultCommissionRate}
                        onChange={e =>
                          handleSettingChange(
                            'defaultCommissionRate',
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        max="50"
                        step="0.5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* University Partner Settings */}
            {activeSection === 'universities' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    University Partner Settings
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        key: 'partnerNotifications',
                        label: 'Partner Notifications',
                        description:
                          'Send notifications to university partners',
                      },
                      {
                        key: 'enrollmentReports',
                        label: 'Enrollment Reports',
                        description: 'Generate automatic enrollment reports',
                      },
                      {
                        key: 'performanceMetrics',
                        label: 'Performance Metrics',
                        description: 'Share performance metrics with partners',
                      },
                    ].map(item => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.label}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleSettingChange(item.key, !settings[item.key])
                          }
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            settings[item.key] ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              settings[item.key]
                                ? 'translate-x-5'
                                : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeSection === 'system' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    System Configuration
                  </h3>
                  <div className="space-y-6">
                    {[
                      {
                        key: 'maintenanceMode',
                        label: 'Maintenance Mode',
                        description: 'Put the system in maintenance mode',
                      },
                      {
                        key: 'apiAccess',
                        label: 'API Access',
                        description: 'Enable API access for integrations',
                      },
                      {
                        key: 'debugMode',
                        label: 'Debug Mode',
                        description: 'Enable debug mode for troubleshooting',
                      },
                    ].map(item => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.label}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleSettingChange(item.key, !settings[item.key])
                          }
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            settings[item.key] ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              settings[item.key]
                                ? 'translate-x-5'
                                : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    ))}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Backup Frequency
                      </label>
                      <select
                        value={settings.backupFrequency}
                        onChange={e =>
                          handleSettingChange('backupFrequency', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-6">
                  <h3 className="text-lg font-semibold text-red-700 mb-4">
                    Danger Zone
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-red-700">
                          Delete All Data
                        </p>
                        <p className="text-sm text-red-600">
                          Permanently delete all application data
                        </p>
                      </div>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200">
                        Delete Data
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-red-700">
                          Export All Data
                        </p>
                        <p className="text-sm text-red-600">
                          Download all data as CSV files
                        </p>
                      </div>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200">
                        Export Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
