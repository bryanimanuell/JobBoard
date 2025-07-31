'use client';

import { useActionState, useEffect } from 'react';
import type { Database } from '@/types/database';
import toast from 'react-hot-toast';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '@/components/submitButton';
import { updateEmailTemplate } from './action';

type Template = Database['public']['Tables']['email_templates']['Row'];
const initialState = { message: '', success: false };

function TemplateForm({ template }: { template: Template }) {
  const [state, formAction] = useActionState(updateEmailTemplate, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) toast.success(state.message);
      else toast.error(state.message);
    }
  }, [state]);
  
  const placeholders = "`__{applicant_name}__`, `__{job_title}__`, `__{company_name}__`"

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="templateId" value={template.id} />
      <div className="space-y-2">
        <Label htmlFor={`subject-${template.id}`}>Email Subject</Label>
        <Input
          id={`subject-${template.id}`}
          name="subject"
          defaultValue={template.subject || ''}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`body-${template.id}`}>Email Body</Label>
        <Textarea
          id={`body-${template.id}`}
          name="body"
          defaultValue={template.body || ''}
          rows={10}
        />
        <p className="text-xs text-gray-400">
          You can use placeholders like: {placeholders}
        </p>
      </div>
      <SubmitButton
        pendingText="Saving..."
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md disabled:bg-indigo-400"
      >
        Save Template
      </SubmitButton>
    </form>
  );
}

export default function TemplateEditor({ templates }: { templates: Template[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {templates.map((template) => (
        <AccordionItem key={template.id} value={template.id} className="border-gray-700">
          <AccordionTrigger className="text-lg hover:no-underline">
            Template for: &quot;{template.status}&quot;
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-gray-900/50 rounded-b-md">
            <TemplateForm template={template} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}