using System.Text.RegularExpressions;
using System.Net.Mail;

namespace Shamazon.Helpers
{
    public class Validation
    {
        static public Boolean ValidatePasswordFormat(string password)
        {
            const string pattern = @"/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/";

            Match match = Regex.Match(password, pattern);

            return match.Success;
        }

        static public Boolean ValidateEmailFormat(string email)
        {
            if (!MailAddress.TryCreate(email, out var mailAddress))
                return false;

            // And if you want to be more strict:
            var hostParts = mailAddress.Host.Split('.');

            if (hostParts.Length == 1)
                return false; // No dot.

            if (hostParts.Any(p => p == string.Empty))
                return false; // Double dot.

            if (hostParts[^1].Length < 2)
                return false; // TLD only one letter.

            if (mailAddress.User.Contains(' '))
                return false;

            if (mailAddress.User.Split('.').Any(p => p == string.Empty))
                return false; // Double dot or dot at end of user part.

            return true;
        }
    }
}