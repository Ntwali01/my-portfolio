'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

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

  const validateForm = () => {
    const nextErrors = {
      name: formData.name.trim() ? '' : 'Please enter your name.',
      email: '',
      message: formData.message.trim() ? '' : 'Please provide a brief message.',
    };

    if (!formData.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please review the highlighted fields and try again.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.error || 'Failed');

      toast.success('Message sent! I will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">Let's Connect</h2>
          <div className="w-20 h-1 bg-accent rounded-full"></div>
          <p className="text-lg text-white/80 max-w-2xl">
            Have a project in mind or want to collaborate? I'd love to hear from you. <span className="text-[#00d6ff] font-medium">Reach out anytime!</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Email */}
            <div className="bg-card p-6 rounded-lg border border-border hover:border-accent transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-secondary rounded-lg">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <a
                    href="mailto:cyubahirontwaliadore@gmail.com"
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    cyubahirontwaliadore@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-card p-6 rounded-lg border border-border hover:border-accent transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-secondary rounded-lg">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <a
                    href="tel:+250798221657"
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    +250 798 221 657
                  </a>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-card p-6 rounded-lg border border-border hover:border-accent transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-secondary rounded-lg">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Location</h3>
                  <p className="text-muted-foreground">Kigali, Rwanda</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} noValidate className="md:col-span-2 bg-card p-8 rounded-lg border border-border">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
                {errors.name && (
                  <p className="mt-2 text-sm font-medium text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  aria-invalid={!!errors.email}
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
                {errors.email && (
                  <p className="mt-2 text-sm font-medium text-destructive">{errors.email}</p>
                )}
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
                  placeholder="Project discussion"
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={6}
                  aria-invalid={!!errors.message}
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground resize-none"
                />
                {errors.message && (
                  <p className="mt-2 text-sm font-medium text-destructive">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
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
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
