import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { generateMetadata as genMeta } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const localeTyped = locale as 'de' | 'en';
  return genMeta({
    title: localeTyped === 'de' ? 'Impressum' : 'Imprint',
    description:
      localeTyped === 'de'
        ? 'Rechtliche Informationen und Impressum von Sanfora Time Pieces. Angaben gemäß § 5 TMG.'
        : 'Legal information and imprint of Sanfora Time Pieces. Information according to § 5 TMG.',
    path: `/${locale}/impressum`,
    locale: localeTyped,
  });
}

export default async function ImpressumPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('impressum');

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <Container className="py-16">
        <div className="max-w-3xl mx-auto space-y-8 font-light text-luxury-gray-700">
          <section>
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Angaben gemäß § 5 TMG</h2>
            <p>
              Sanfora Time Pieces<br />
              Max Mustermann<br />
              Musterstraße 123<br />
              12345 Musterstadt<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Kontakt</h2>
            <p>
              Telefon: +49 (0) 123 456 7890<br />
              E-Mail: info@sanfora-timepieces.de
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
              DE123456789
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Verantwortlich für den Inhalt</h2>
            <p>
              Max Mustermann<br />
              Musterstraße 123<br />
              12345 Musterstadt
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Haftungsausschluss</h2>
            <h3 className="font-normal text-luxury-black mt-4 mb-2">Haftung für Inhalte</h3>
            <p className="mb-4">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
            <h3 className="font-normal text-luxury-black mt-4 mb-2">Haftung für Links</h3>
            <p className="mb-4">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
