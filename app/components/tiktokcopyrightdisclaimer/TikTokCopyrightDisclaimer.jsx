// components/TikTokCopyrightDisclaimer.jsx
import { AlertCircle, Scale, Shield } from "lucide-react";

export function TikTokCopyrightDisclaimer() {
  return (
    <div className="mt-8 space-y-4">
      {/* Copyright Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-medium text-amber-800 dark:text-amber-400">
              📋 Copyright & Fair Use Disclaimer
            </p>
            <p className="text-amber-700 dark:text-amber-500">
              This tool downloads <strong>publicly available</strong> TikTok
              videos for
              <strong> personal, non-commercial use only</strong>. You must have
              permission from the content owner before downloading or using any
              video. All rights belong to their respective owners.
            </p>
            <p className="text-amber-700 dark:text-amber-500 mt-2 text-xs">
              <strong>Report Copyright Infringement:</strong> dmca@shopyor.com
            </p>
          </div>
        </div>
      </div>

      {/* Legal Notice */}
      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Scale className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-medium text-red-800 dark:text-red-400 mb-1">
              ⚠️ Legal Notice
            </p>
            <p className="text-red-700 dark:text-red-500">
              Shopyor is not affiliated with TikTok or ByteDance. Users are
              responsible for complying with TikTok's Terms of Service and
              applicable laws.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-medium text-blue-800 dark:text-blue-400 mb-1">
              🔒 Privacy Guarantee
            </p>
            <p className="text-blue-700 dark:text-blue-500">
              We don't store any videos or personal data. All processing happens
              in real-time and no files are saved on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
