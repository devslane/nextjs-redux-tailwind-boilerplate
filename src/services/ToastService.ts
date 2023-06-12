import { toast, ToastContent, ToastOptions } from 'react-toastify';

class ToastService {
  private static _instance: ToastService;

  static getInstance(): ToastService {
    if (!this._instance) {
      this._instance = new ToastService();
    }
    return this._instance;
  }

  showError(content: ToastContent, config?: ToastOptions) {
    toast(content, {
      ...config,
      type: 'error',
      position: config?.position || 'bottom-right',
      autoClose: config?.delay || 4000,
    });
  }

  showInfo(content: ToastContent, config?: ToastOptions) {
    toast(content, {
      ...config,
      type: 'info',
      position: config?.position || 'bottom-right',
      autoClose: config?.autoClose || 4000,
    });
  }

  showSuccess(content: ToastContent, config?: ToastOptions) {
    toast(content, {
      ...config,
      type: 'success',
      position: config?.position || 'bottom-right',
      autoClose: config?.autoClose || 4000,
    });
  }

  showWarning(content: ToastContent, config?: ToastOptions) {
    toast(content, {
      ...config,
      type: 'warning',
      position: config?.position || 'bottom-right',
      autoClose: config?.autoClose || 4000,
    });
  }

  dismiss(toastRef: any) {
    toast.dismiss(toastRef);
  }
}

export const toastService = ToastService.getInstance();
