import type { Email, Label } from 'src/types/template-types/mail';
import { deepCopy } from 'src/utils/deep-copy';

import { emails, labels } from './data';

type GetLabelsRequest = object;

type GetLabelsResponse = Promise<Label[]>;

type GetEmailsRequest = { label?: string };

type GetEmailsResponse = Promise<Email[]>;

type GetEmailRequest = {
  emailId: string;
};

type GetEmailResponse = Promise<Email>;

class MailApi {
  getLabels(request?: GetLabelsRequest): GetLabelsResponse {
    return Promise.resolve(deepCopy(labels));
  }

  getEmails(request: GetEmailsRequest = {}): GetEmailsResponse {
    const { label } = request;

    return new Promise((resolve, reject) => {
      try {
        // Initially we make a copy of all emails.
        // On a real server this will be different since there will be a real DB query.
        const clonedEmails = deepCopy(emails) as Email[];

        let filteredEmails: Email[] = [];

        // Get all user custom labels
        const customLabels = labels.reduce((acc: string[], label) => {
          if (label.type === 'custom') {
            acc.push(label.id);
          }

          return acc;
        }, []);

        if (label && customLabels.includes(label!)) {
          filteredEmails = clonedEmails.filter((email) => email.labelIds.includes(label!));
        } else {
          switch (label) {
            case undefined:
            case 'inbox':
              filteredEmails = clonedEmails.filter((email) => email.folder === 'inbox');
              break;
            case 'all':
              filteredEmails = [...clonedEmails];
              break;
            case 'sent':
            case 'trash':
              filteredEmails = clonedEmails.filter((email) => email.folder === label);
              break;
            case 'starred':
              filteredEmails = clonedEmails.filter((email) => email.isStarred);
              break;
            case 'important':
              filteredEmails = clonedEmails.filter((email) => email.isImportant);
              break;
            default:
            // Do nothing
          }
        }

        resolve(filteredEmails);
      } catch (err) {
        console.error('[Mail Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  getEmail(request: GetEmailRequest): GetEmailResponse {
    const { emailId } = request;

    return new Promise((resolve, reject) => {
      try {
        const clonedEmails = deepCopy(emails) as Email[];

        // Find the mail
        const email = clonedEmails.find((email) => email.id === emailId);

        if (!email) {
          reject(new Error('Email not found'));
          return;
        }

        resolve(email);
      } catch (err) {
        console.error('[Mail Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const mailApi = new MailApi();
