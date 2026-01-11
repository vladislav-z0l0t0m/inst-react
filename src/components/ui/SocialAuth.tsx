import { config } from "../../config";
import { Providers } from "../../constants/providers";
import { useTranslation } from "react-i18next";
import { FaGoogle, FaFacebook } from "react-icons/fa";

export const SocialAuth = () => {
  const { t } = useTranslation(["auth"]);

  const handleSocialLogin = (provider: Providers): void => {
    window.location.href = `${config.apiGatewayUrl}/${provider}`;
  };

  return (
    <div className='mt-6 space-y-6'>
      <div className='relative flex items-center justify-center'>
        <div className='border-t border-gray-300 w-full'></div>
        <span className='bg-white px-2 text-sm text-gray-500 absolute'>
          {t("common.or")}
        </span>
      </div>

      <div className='flex flex-col gap-2'>
        <button
          onClick={() => handleSocialLogin(Providers.GOOGLE)}
          className='cursor-pointer flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200'
        >
          <FaGoogle className='text-red-500' />
          <span className='text-gray-700 font-medium'>
            {t("common.google")}
          </span>
        </button>

        <button
          onClick={() => handleSocialLogin(Providers.FACEBOOK)}
          className='cursor-pointer flex items-center justify-center gap-2 w-full px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166fe5] transition duration-200'
        >
          <FaFacebook />
          <span className='font-medium'>{t("common.facebook")}</span>
        </button>
      </div>
    </div>
  );
};
