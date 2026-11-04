import React, { useState } from 'react';
import { Mail, Check, Copy, Send, Clock, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from '../components/ui/SocialIcons';
import { portfolioData } from '../data/portfolio';

export function ContactSection() {
  const { contact, personal } = portfolioData;

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Creative Project Commission',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: 'Creative Project Commission',
        message: '',
      });
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Intro Note */}
      <div className="space-y-2">
        <p className="text-sm md:text-base text-[#292827]/80 leading-relaxed">
          {contact.note}
        </p>

        {/* Studio Status & Timezone */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#292827]/70 font-medium">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEE8DE]/70">
            <Clock className="w-3.5 h-3.5 text-[#613F4D]" />
            <span>{personal.location} ({personal.timezone})</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8CFCB]/40 text-[#613F4D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B9E87]" />
            <span>{contact.availability}</span>
          </div>
        </div>
      </div>

      {/* Direct Email Card with 1-Click Copy */}
      <div className="p-5 rounded-2xl bg-[#EEE8DE]/60 border border-[#C99B9B]/25 flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[#613F4D] font-semibold">
            Direct Studio Inquiries
          </div>
          <div className="font-serif text-lg md:text-xl font-medium text-[#292827] mt-0.5">
            {contact.email}
          </div>
        </div>

        <button
          onClick={handleCopyEmail}
          className="px-3.5 py-2 rounded-xl bg-[#F8F5EF] hover:bg-[#613F4D] hover:text-[#F8F5EF] text-[#292827] text-xs font-medium border border-[#C99B9B]/30 transition-all duration-200 flex items-center gap-1.5 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#8B9E87]" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 opacity-70" />
              <span>Copy Email</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Contact Form */}
      <div className="space-y-4">
        <div className="text-xs uppercase tracking-widest font-semibold text-[#613F4D] flex items-center gap-2">
          <Mail className="w-3.5 h-3.5" />
          <span>Send a Direct Message</span>
        </div>

        {formStatus === 'success' ? (
          <div className="p-6 rounded-2xl bg-[#EEE8DE] border border-[#8B9E87]/40 text-center space-y-2 animate-fade-in">
            <div className="w-10 h-10 rounded-full bg-[#8B9E87]/20 text-[#613F4D] flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-5 h-5 text-[#8B9E87]" />
            </div>
            <h4 className="font-serif text-xl font-medium text-[#292827]">
              Message Received
            </h4>
            <p className="text-xs text-[#292827]/75 max-w-sm mx-auto leading-relaxed">
              Thank you for reaching out. Clara will review your note and respond within 24 to 48 business hours.
            </p>
            <button
              onClick={() => setFormStatus('idle')}
              className="mt-3 px-4 py-1.5 rounded-full bg-[#613F4D] text-[#F8F5EF] text-xs font-medium hover:bg-[#4E313D] transition-colors"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#292827]/80">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Astrid Lindgren"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F5EF] border border-[#C99B9B]/30 text-xs text-[#292827] focus:outline-none focus:ring-2 focus:ring-[#613F4D]/50 focus:border-[#613F4D] transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#292827]/80">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@studio.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F5EF] border border-[#C99B9B]/30 text-xs text-[#292827] focus:outline-none focus:ring-2 focus:ring-[#613F4D]/50 focus:border-[#613F4D] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#292827]/80">
                Inquiry Focus
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F5EF] border border-[#C99B9B]/30 text-xs text-[#292827] focus:outline-none focus:ring-2 focus:ring-[#613F4D]/50 focus:border-[#613F4D] transition-colors"
              >
                <option value="Creative Project Commission">Creative Project Commission</option>
                <option value="3D WebGL / Spatial Architecture">3D WebGL / Spatial Architecture</option>
                <option value="Design System Consultation">Design System Consultation</option>
                <option value="Speaking / Workshop">Speaking / Workshop</option>
                <option value="Casual Hello">Casual Hello &amp; Exchange</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#292827]/80">
                Message *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell me about your vision, timeline, and goals..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F5EF] border border-[#C99B9B]/30 text-xs text-[#292827] focus:outline-none focus:ring-2 focus:ring-[#613F4D]/50 focus:border-[#613F4D] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={formStatus === 'submitting'}
              className="w-full py-3 rounded-xl bg-[#613F4D] hover:bg-[#4E313D] text-[#F8F5EF] text-xs font-medium transition-colors shadow-md flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D]"
            >
              {formStatus === 'submitting' ? (
                <span>Transmitting message...</span>
              ) : (
                <>
                  <span>Dispatch Letter to Island</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Social Profiles */}
      <div className="pt-4 border-t border-[#C99B9B]/20">
        <div className="text-[11px] uppercase tracking-wider text-[#292827]/60 font-semibold mb-3">
          Network &amp; Profiles
        </div>
        <div className="flex flex-wrap gap-2">
          {contact.github && (
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-[#EEE8DE]/70 hover:bg-[#613F4D] hover:text-[#F8F5EF] text-[#292827] text-xs font-medium transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D]"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-[#EEE8DE]/70 hover:bg-[#613F4D] hover:text-[#F8F5EF] text-[#292827] text-xs font-medium transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D]"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          )}
          {contact.twitter && (
            <a
              href={contact.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-[#EEE8DE]/70 hover:bg-[#613F4D] hover:text-[#F8F5EF] text-[#292827] text-xs font-medium transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D]"
            >
              <TwitterIcon className="w-3.5 h-3.5" />
              <span>Twitter</span>
            </a>
          )}
          {contact.instagram && (
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-[#EEE8DE]/70 hover:bg-[#613F4D] hover:text-[#F8F5EF] text-[#292827] text-xs font-medium transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D]"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
