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
        ? 'Rechtliche Informationen und Impressum von Sanfora Time Pieces. Angaben gemäss § 5 TMG.'
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
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Firmeninformationen</h2>
            <p>
              Sanfora Time Pieces<br />
              Furtbachstrasse 16<br />
              8107 Buchs ZH<br />
              Schweiz
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Kontakt</h2>
            <p>
              WhatsApp: +41 79 884 12 12<br />
              E-Mail: Info@sanfora.ch
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Verantwortlich für den Inhalt</h2>
            <p>
              Sanfora Time Pieces<br />
              Furtbachstrasse 16<br />
              8107 Buchs ZH
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Haftungsausschluss</h2>
            <h3 className="font-normal text-luxury-black mt-4 mb-2">Haftung für Inhalte</h3>
            <p className="mb-4">
              Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            </p>
            <h3 className="font-normal text-luxury-black mt-4 mb-2">Haftung für Links</h3>
            <p className="mb-4">
              Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-luxury-black mb-4">Urheberrecht</h2>
            <p>
              Die durch die Betreiber dieser Website erstellten Inhalte und Werke unterliegen dem schweizerischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
