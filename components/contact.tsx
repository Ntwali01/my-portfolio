'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { contactInfo } from '@/lib/portfolio-data';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fallbackTriggered, setFallbackTriggered] = useState(false);

  const validateForm = () => {
    const nextErrors = {
      name: formData.name.trim() ? '' : 'Please enter your name.',
      email: '',
      message: formData.message.trim() ? '' : 'Please enter your message.',
    };

    if (!formData.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    setErrors(nextErrors);
    return !nextErrors.name && !nextErrors.email && !nextErrors.message;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name in errors) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const getMailtoUrl = () => {
    const sub = encodeURIComponent(formData.subject.trim() || `Portfolio Inquiry from ${formData.name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
    );
    return `mailto:${contactInfo.email}?subject=${sub}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please complete the required fields.');
      return;
    }

    setIsLoading(true);
    setFallbackTriggered(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Unable to deliver message at this time.');
      }

      toast.success('Message sent! I will review your note and get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      setFallbackTriggered(true);
      toast.error(error.message || 'Direct email delivery service unavailable. Please use the mailto button below.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Get In Touch</h2>
          <div className="w-20 h-1 bg-accent rounded-full"></div>
          <p className="text-lg text-white/80 max-w-2xl">
            Interested in discussing robotics teleoperation, quality assurance, web development, or collaboration? Reach out directly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Verified Contact Details Column */}
          <div className="space-y-5">
            {/* Email */}
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-accent/60 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-lg text-accent shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-1">
                    Email
                  </h3>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm text-accent hover:underline break-all block"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            {contactInfo.phone && (
              <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-accent/60 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary rounded-lg text-[#5df7c1] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-1">
                      Phone / WhatsApp
                    </h3>
                    <a
                      href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                      className="text-sm text-white/90 hover:text-accent transition-colors block"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Location */}
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-accent/60 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-lg text-[#00d6ff] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-1">
                    Location
                  </h3>
                  <p className="text-sm text-muted-foreground">{contactInfo.location}</p>
                </div>
              </div>
            </div>

            {/* Availability Note */}
            <div className="p-4 rounded-xl bg-secondary/40 border border-border/80 text-xs text-muted-foreground leading-relaxed">
              <span className="text-foreground font-medium">Availability:</span> Open to software engineering opportunities, robotics data/teleoperation workflows, and SOP quality assurance roles.
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="md:col-span-2 bg-card/85 backdrop-blur-sm p-7 sm:p-9 rounded-xl border border-border">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name <span className="text-accent">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className="bg-secondary/70 border-border text-foreground placeholder:text-muted-foreground"
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs font-medium text-destructive">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className="bg-secondary/70 border-border text-foreground placeholder:text-muted-foreground"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs font-medium text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Teleoperation, QA, or Web Project"
                  className="bg-secondary/70 border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message <span className="text-accent">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, inquiry, or role requirements..."
                  rows={5}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className="bg-secondary/70 border-border text-foreground placeholder:text-muted-foreground resize-none"
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs font-medium text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Buttons & Fallback */}
              <div className="space-y-4 pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>

                {fallbackTriggered && (
                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-medium">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Direct email delivery alternative</span>
                    </div>
                    <p>
                      If server email delivery is delayed, you can send your message directly via your email client:
                    </p>
                    <a
                      href={getMailtoUrl()}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-100 font-medium transition-colors"
                    >
                      <span>Open Pre-filled Email</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
