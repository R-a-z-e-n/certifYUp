
import React from 'react';

export const Testimonials = () => {
  const testimonials = [
    {
      quote: "Certiyup helped me land my first internship in 2 weeks. The process was smooth and transparent.",
      author: "Student User",
      role: "Software Engineering Intern"
    },
    {
      quote: "We saved hours of screening time. Certiyup gave us verified candidates ready to work.",
      author: "Recruiter",
      role: "Talent Acquisition at PixelPerfect"
    }
  ];

  return (
    <section className="py-24 bg-slate-900 dark:bg-slate-950 text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Trusted by the Community</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-slate-800 dark:bg-slate-900 p-10 rounded-3xl border border-slate-700 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-sky-500 transition-all group">
              <div className="text-emerald-400 dark:text-sky-400 text-4xl mb-6 group-hover:scale-110 transition-transform">“</div>
              <p className="text-xl leading-relaxed mb-8">{t.quote}</p>
              <div>
                <div className="font-bold text-lg">{t.author}</div>
                <div className="text-emerald-400 dark:text-sky-400 text-sm font-medium">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
