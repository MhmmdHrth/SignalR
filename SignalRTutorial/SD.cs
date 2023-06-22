namespace SignalRTutorial
{
    public static class SD
    {
        static SD()
        {
            VotingCount = new()
            {
                { PN, 0 },
                { PH, 0 },
                { BN, 0 }
            };
        }

        public const string PN = "pn";
        public const string PH = "ph";
        public const string BN = "bn";

        public static Dictionary<string, int> VotingCount;
    }
}
