import { jsPDF } from 'jspdf';

const COLORS = {
  dark: [30, 58, 47],
  green: [123, 155, 115],
  amber: [200, 146, 42],
  teal: [74, 138, 138],
  gray: [100, 110, 100],
  light: [247, 245, 240],
  white: [255, 255, 255],
};

function drawSectionHeader(doc, label, y, pageWidth) {
  doc.setFillColor(...COLORS.green);
  doc.rect(14, y, 4, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.dark);
  doc.text(label.toUpperCase(), 22, y + 6.5);
  doc.setDrawColor(...COLORS.green);
  doc.setLineWidth(0.3);
  doc.line(14, y + 10, pageWidth - 14, y + 10);
  return y + 14;
}

export function generateCV(t, language) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  // ---- HEADER ----
  // Background strip
  doc.setFillColor(...COLORS.dark);
  doc.rect(0, 0, pageWidth, 50, 'F');

  // Accent line
  doc.setFillColor(...COLORS.green);
  doc.rect(0, 48, pageWidth, 2, 'F');

  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...COLORS.white);
  doc.text('NALA REHAREHA', margin, 20);

  // Full name
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.green);
  doc.setFont('helvetica', 'normal');
  doc.text('RANAIVO RATSIHARINIEFTRA', margin, 27);

  // Title
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.amber);
  const title = language === 'fr' ? 'Développeur Fullstack · IA & Big Data' : 'Fullstack Developer · AI & Big Data';
  doc.text(title, margin, 36);

  // Contact in header (right aligned)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(180, 200, 180);
  const headerContacts = [
    'rehareharanaivo@gmail.com',
    '+261 38 93 120 30',
    'Antananarivo, Madagascar',
    'github.com/rehareha',
  ];
  headerContacts.forEach((c, i) => {
    doc.text(c, pageWidth - margin, 15 + i * 7, { align: 'right' });
  });

  let y = 58;

  // ---- SUMMARY ----
  y = drawSectionHeader(doc, language === 'fr' ? 'Profil' : 'Summary', y, pageWidth);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...COLORS.gray);
  const summaryText = language === 'fr'
    ? "Étudiant en informatique avec une véritable passion pour l'IA. Développeur fullstack maîtrisant React, Node.js, Python et les pipelines LLM. Ambitieux, autonome et orienté résultats."
    : "Computer Science student with a genuine passion for AI. Fullstack developer skilled in React, Node.js, Python, and LLM pipelines. Ambitious, self-driven, and results-oriented.";
  const summaryLines = doc.splitTextToSize(summaryText, pageWidth - margin * 2);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 5.5 + 6;

  // ---- EXPERIENCE ----
  y = drawSectionHeader(doc, language === 'fr' ? 'Expérience Professionnelle' : 'Work Experience', y, pageWidth);

  t.experience.jobs.forEach((job, ji) => {
    // Check page overflow
    if (y > pageHeight - 30) {
      doc.addPage();
      y = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...COLORS.dark);
    doc.text(job.role, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.teal);
    doc.text(job.company, margin, y + 5);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(...COLORS.amber);
    doc.text(job.period, pageWidth - margin, y, { align: 'right' });

    y += 11;

    // Tech tags as text line
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.green);
    doc.text(job.tech.join(' · '), margin, y);
    y += 6;

    doc.setTextColor(...COLORS.gray);
    doc.setFontSize(9);
    job.bullets.forEach((bullet) => {
      if (y > pageHeight - 20) { doc.addPage(); y = 20; }
      const lines = doc.splitTextToSize(`• ${bullet}`, pageWidth - margin * 2 - 5);
      doc.text(lines, margin + 2, y);
      y += lines.length * 4.8;
    });

    y += ji < t.experience.jobs.length - 1 ? 5 : 4;
  });

  // ---- EDUCATION ----
  if (y > pageHeight - 60) { doc.addPage(); y = 20; }
  y = drawSectionHeader(doc, language === 'fr' ? 'Formation' : 'Education', y, pageWidth);

  t.education.items.forEach((item) => {
    if (y > pageHeight - 20) { doc.addPage(); y = 20; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.dark);
    doc.text(item.degree, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.teal);
    doc.text(item.school, margin, y + 5);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(...COLORS.amber);
    doc.text(item.period, pageWidth - margin, y, { align: 'right' });
    y += 13;
  });

  // ---- SKILLS ----
  if (y > pageHeight - 60) { doc.addPage(); y = 20; }
  y = drawSectionHeader(doc, language === 'fr' ? 'Compétences' : 'Skills', y, pageWidth);

  t.skills.categories.forEach((cat) => {
    if (y > pageHeight - 18) { doc.addPage(); y = 20; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.green);
    doc.text(`${cat.label}:`, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.gray);
    const skillText = cat.items.join('  ·  ');
    const skillLines = doc.splitTextToSize(skillText, pageWidth - margin * 2 - 28);
    doc.text(skillLines, margin + 28, y);
    y += Math.max(skillLines.length * 5, 6);
  });

  // ---- LANGUAGES ----
  y += 4;
  if (y > pageHeight - 30) { doc.addPage(); y = 20; }
  y = drawSectionHeader(doc, language === 'fr' ? 'Langues' : 'Languages', y, pageWidth);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...COLORS.gray);
  const langText = t.about.languages.items.map((l) => `${l.lang} — ${l.level}`).join('    ·    ');
  doc.text(langText, margin, y);
  y += 8;

  // ---- INTERESTS ----
  if (y > pageHeight - 25) { doc.addPage(); y = 20; }
  y = drawSectionHeader(doc, language === 'fr' ? 'Centres d\'intérêt' : 'Interests', y, pageWidth);
  doc.setFontSize(9.5);
  doc.setTextColor(...COLORS.gray);
  doc.text(t.about.interests.items.join('   ·   '), margin, y);

  // ---- FOOTER ----
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(180, 190, 180);
    doc.text(
      `Nala Rehareha — ${language === 'fr' ? 'Développeur Fullstack' : 'Fullstack Developer'} · ${i}/${totalPages}`,
      pageWidth / 2,
      pageHeight - 7,
      { align: 'center' }
    );
  }

  const filename = language === 'fr' ? 'CV_Nala_Rehareha_FR.pdf' : 'CV_Nala_Rehareha_EN.pdf';
  doc.save(filename);
}
