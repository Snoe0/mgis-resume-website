# Supabase Schema Design — ResumeForge

**Date:** 2026-03-24
**Status:** Approved

## Overview

Standalone SQL migration for ResumeForge's Supabase backend. Creates the tables, triggers, RLS policies, and storage buckets needed for user accounts, template marketplace, and order tracking.

## Auth

- **Supabase Auth** with email/password only
- No roles — every user is both a buyer and a seller
- Profile auto-created on signup via database trigger

## Tables

### `profiles`
Extends `auth.users` with marketplace-specific fields (display name, bio, specialty, avatar, links). Primary key is the `auth.users.id` UUID. Auto-created on signup, auto-updates `updated_at` on change.

### `templates`
Stores template metadata. Files are stored in the `template-files` storage bucket. Price is in cents (0 = free). Status lifecycle: `draft` → `published` (or `rejected`). Foreign key to `profiles.id` via `seller_id`.

### `orders`
Purchase records written by the Stripe webhook (service role, bypasses RLS). `buyer_id` is nullable for guest checkout. `template_id` references the purchased template. `stripe_session_id` is unique to prevent duplicate inserts.

## Storage Buckets

| Bucket | Public | Purpose |
|--------|--------|---------|
| `avatars` | Yes | Profile pictures — public read, user-scoped write |
| `template-files` | No | Uploaded PDFs/DOCXs — signed URLs after purchase |

## Row Level Security

- **Profiles:** publicly readable, self-update only
- **Templates:** published templates are publicly readable, sellers CRUD their own (any status)
- **Orders:** buyers read their own, sellers read orders for their templates, webhook inserts via service role
- **Storage:** user-scoped folder paths (`{user_id}/*`) for both buckets

## Migration File

`supabase/migrations/001_initial_schema.sql` — paste into Supabase SQL Editor to run.
