-- Every click on a "Book Appointment" control across the site, with whatever
-- Google Ads / UTM attribution the visitor's session was carrying.
--
-- Deliberately holds no patient data: the booking form itself is a
-- cross-origin Firebase iframe, so nothing a patient types is visible here.
CREATE TABLE IF NOT EXISTS booking_clicks (
  id           BIGSERIAL PRIMARY KEY,
  clicked_at   TIMESTAMPTZ NOT NULL DEFAULT now(),

  event_name   TEXT,
  page_path    TEXT,

  gclid        TEXT,
  gbraid       TEXT,
  wbraid       TEXT,

  utm_source   TEXT,
  utm_medium   TEXT,
  utm_campaign TEXT,
  utm_term     TEXT,
  utm_content  TEXT,

  landing_page TEXT,
  referrer     TEXT,
  country      TEXT,
  region       TEXT,
  user_agent   TEXT
);

CREATE INDEX IF NOT EXISTS booking_clicks_clicked_at_idx
  ON booking_clicks (clicked_at DESC);

CREATE INDEX IF NOT EXISTS booking_clicks_gclid_idx
  ON booking_clicks (gclid) WHERE gclid IS NOT NULL;

CREATE INDEX IF NOT EXISTS booking_clicks_campaign_idx
  ON booking_clicks (utm_campaign) WHERE utm_campaign IS NOT NULL;
