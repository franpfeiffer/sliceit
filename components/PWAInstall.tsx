'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export default function PWAInstall() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
    const [showInstallPrompt, setShowInstallPrompt] = useState(false)
    const [showFloatingButton, setShowFloatingButton] = useState(false)
    const [isInstalled, setIsInstalled] = useState(false)
    const [debugInfo, setDebugInfo] = useState('')

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                        console.log('SW registered: ', registration)
                    })
                    .catch((registrationError) => {
                        console.log('SW registration failed: ', registrationError)
                    })
            })
        }

        const handleBeforeInstallPrompt = (e: Event) => {
            console.log('beforeinstallprompt fired!')
            e.preventDefault()
            setDeferredPrompt(e as BeforeInstallPromptEvent)
            setShowInstallPrompt(true)
            setDebugInfo('Install prompt available')
        }

        const handleAppInstalled = () => {
            console.log('App installed!')
            setIsInstalled(true)
            setShowInstallPrompt(false)
            setShowFloatingButton(false)
            setDeferredPrompt(null)
        }

        const checkIfInstalled = () => {
            const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                (window.navigator as any).standalone === true

            if (isStandalone) {
                setIsInstalled(true)
                setDebugInfo('Already installed')
            } else {
                setDebugInfo('Not installed yet')

                setTimeout(() => {
                    if (!deferredPrompt) {
                        setShowInstallPrompt(true)
                    }
                }, 3000)
            }
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        window.addEventListener('appinstalled', handleAppInstalled)

        checkIfInstalled()

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
            window.removeEventListener('appinstalled', handleAppInstalled)
        }
    }, [deferredPrompt])

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt()
            const { outcome } = await deferredPrompt.userChoice

            if (outcome === 'accepted') {
                console.log('User accepted the install prompt')
            } else {
                console.log('User dismissed the install prompt')
            }

            setDeferredPrompt(null)
            setShowInstallPrompt(false)
            setShowFloatingButton(false)
        } else {
            alert('Para instalar:\n\n1. Chrome: Menú (⋮) > "Instalar SliceIt"\n2. Safari: Compartir > "Añadir a pantalla de inicio"\n3. Firefox: Menú > "Instalar"')
        }
    }

    const handleDismiss = () => {
        setShowInstallPrompt(false)
        setShowFloatingButton(true)
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('pwa-install-dismissed', 'true')
        }
    }

    const handleFloatingButtonClick = () => {
        setShowFloatingButton(false)
        setShowInstallPrompt(true)
    }

    const isDismissed = typeof window !== 'undefined' && sessionStorage.getItem('pwa-install-dismissed')

    if (isInstalled) {
        return (
            <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded text-xs opacity-50">
                Debug: {debugInfo}
            </div>
        )
    }

    return (
        <>
            <AnimatePresence>
                {showInstallPrompt && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto"
                    >
                        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center text-2xl">
                                        🍰
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg">Install SliceIt</h3>
                                        <p className="text-gray-400 text-sm">Quick access anytime</p>
                                        <p className="text-xs text-gray-500">{debugInfo}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleDismiss}
                                    className="text-gray-400 hover:text-white transition-colors p-1"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center space-x-2 text-sm text-gray-300">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <span>Works offline</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-300">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <span>Fast loading</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-300">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                    <span>Native app experience</span>
                                </div>
                            </div>

                            <div className="flex space-x-3 mt-6">
                                <button
                                    onClick={handleDismiss}
                                    className="flex-1 px-4 py-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    Not now
                                </button>

                                <motion.button
                                    onClick={handleInstallClick}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-blue-700 hover:to-green-700 transition duration-200 flex items-center justify-center space-x-2"
                                >
                                    <Download size={16} />
                                    <span>Install</span>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showFloatingButton && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8, x: 100 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 100 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleFloatingButtonClick}
                        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 text-white rounded shadow-xl flex items-center justify-center hover:from-blue-700 hover:to-green-700 transition-all duration-300"
                        title="Install SliceIt App"
                    >
                        <Download size={60} />
                    </motion.button>
                )}
            </AnimatePresence>

            {isDismissed && !showFloatingButton && !showInstallPrompt && (
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    Debug: {debugInfo}
                </div>
            )}
        </>
    )
}
